var sys    = require("sys")
  , http   = require("http")
  , events = require("events")
  , path   = require("path")
  , fs	   = require('fs')
  , EventEmitter = require("events").EventEmitter;
  
/**
 * namespace TranslinkClient
 */

if(typeof(TranslinkClient) == 'undefined') {
    var TranslinkClient = {};
}

(function() {

this.host = 'm.translink.ca';
this.client = new http.createClient(80, host);

this.init = function() {
    
}

function _req(method, path, host, callback) {
    var req = client.request(method, path, {host: host});    
    req.end();
    req.on('response', function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          callback(chunk);
        });
    });
}

this.getStop = function(stop) {
    var path = '/api/stops/?q='+stop;
    _req('GET', path, this.host, TranslinkClient.callback);
}

this.callback = function(chunk) {
    console.log(chunk);
}
    
}).apply(TranslinkClient);  


TranslinkClient.getStop('51217')

