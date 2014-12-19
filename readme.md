Street Facing - [Demo](http://alexhancock.github.com/street-facing/)
==========

![Street Facing Screenshot](https://dl.dropbox.com/u/12445335/street-facing.png)

**Street Facing** is an experimental application that runs in the browser and allows you to control the POV on Google Street View with movements of your face and head.

You can check out a demo of it [here](http://alexhancock.github.com/street-facing/).

It is built on top of a few things...

* The Google Maps V3 JavaScript [API](https://developers.google.com/maps/documentation/javascript/), including the Places [library](https://developers.google.com/maps/documentation/javascript/places).
* An open source JavaScript library for tracking head and face movement called [headtrackr.js](https://github.com/auduno/headtrackr)
* (It also depends on [underscore.js](http://underscorejs.org) and [backbone.js](http://backbonejs.org))

### Browser Support ###

* Chrome (21+)
* Opera (Support coming soon)

### Usage ###

Once all the code is included, the following call initiates the app on any page...
```js
var mainView = new Street_Facing_View({
    el: '#main_street_view'
});
```

I might spend some time in the near future modularizing and generalizing this code, so people can drop it into any project if there is interest.

### Contributors ###

Run `npm install` , then `grunt` in your terminal, an http server will launch with livereload of the sources to ease your development ([getUserMedia](http://dev.w3.org/2011/webrtc/editor/getusermedia.html) doesn't do so well on `file://` protocol on most browsers)

### Releases notes ###

#### v0.1.0 @topheman
* Added feature : ability to change pov with mouse without interfering with headtrackr
* Added Gruntfile to ease dev with local server and livereload

#### v0.0.0 @alexhancock
* first release by Alex Hancock @alexhancock
