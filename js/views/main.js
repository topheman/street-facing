    var Street_Facing_View = Backbone.View.extend({

        initialize:function(){
            _.bindAll(this);

            var sfv = this;
            $(window).on('load', function(e){
                sfv.render(false, true);
            });
        },

        render: function(starting_loc, new_tracker) {
            if (!starting_loc){
                starting_loc = new google.maps.LatLng(40.78428, -73.95432399999999); // Set a default - On Park Ave in NYC
            }

            this.panoramaOptions = {
                position: starting_loc,
                pov: { heading: 180, pitch: 0, zoom: 1 },
                scrollwheel: false, zoomControl: false, panControl: false, linksControl: false, addressControl: false
            };

            if (new_tracker){
                var videoInput = $('#inputVideo')[0];
                var canvasInput = $('#inputCanvas')[0];
                var htracker = new headtrackr.Tracker();
                    htracker.init(videoInput, canvasInput);
                    htracker.start();

                this.panorama = new google.maps.StreetViewPanorama(this.el, this.panoramaOptions);
                this.panorama.setVisible(true);

                // Throttle the calling of the handler for head movement events to once every 20ms
                var throttled_update = _.throttle(this.handleHeadMovement, 20);
                this.currentPov = this.panorama.pov;

                var that = this;
                $(document).on('headtrackingEvent', function(e){
                    throttled_update(that.currentPov, e);
                });

                this.registerSearchView(this.panorama, this);
            } else {
                this.panorama = new google.maps.StreetViewPanorama(this.el, this.panoramaOptions);
                this.panorama.setVisible(true);
            }
            this.registerPointerManager();
        },

        registerSearchView: function(panorama, mainView){
            var search_box = new Address_Search_View({
                el: '#searchInput',
                map: null,
                pano: panorama,
                mainView: mainView
            });
            search_box.render();
        },

        handleHeadMovement: function(currentPov, e){
            var head_x = 0,
                head_y = 0;
            
            if(this.pointerStateActive){
                return false;
            }
            else{
                // Get the amount the head moved left/right and up/down relative to the camera
                head_x = e.originalEvent.x;
                head_y = e.originalEvent.y / 2;
            }

            // Calculate a new heading and pitch
            var new_heading = (currentPov.heading+360)%360 - head_x;
            var new_pitch = currentPov.pitch - head_y;

            var newPov = {
                heading: new_heading,
                pitch: new_pitch,
                zoom: 1
            };

            this.panorama.setPov(newPov);
        },
        
        registerPointerManager: function() {
            var that = this;
            this.$el.on('mousedown',function(){
                that.pointerStateActive = true;
            });
            //needs to be attached to document in case of mouseup triggers outside the original elem
            $(document).on('mouseup',function(){
                if(that.pointerStateActive){
                    that.pointerStateActive = false;
                    that.currentPov = that.panorama.getPov();
                }
            });
        },
        
        pointerStateActive : false
    });
