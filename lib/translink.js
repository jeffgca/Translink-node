// System
var sys    = require("sys")
  , http   = require("http")
  , events = require("events")
  , path   = require("path")
  , fs	   = require('fs')
  , EventEmitter = require("events").EventEmitter;

/* need:

 - events implemented for the translink API:
    http://www.mweisman.com/transit.html
 - http client to make requests to the translink api

*/

var app;
(function() {
    app = new EventEmitter();
    
    /* route */
    app.addListener('login', function() {
        
    });
    

    
    
})();

exports.app = app;