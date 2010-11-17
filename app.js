// System
var sys    = require("sys")
  , http   = require("http")
  , events = require("events")
  , path   = require("path")
  , fs	   = require('fs')
  , EventEmitter = require("events").EventEmitter;
  
// Utility
var out = sys.puts;
var D = function(o) {out(sys.inspect(o))}
var log = function (msg) {
    if (typeof(msg) !== 'string') {
        msg = JSON.stringify(arguments);
    }
    out(">>> " + msg);
}

var VENDOR_PATH = fs.realpathSync(__dirname + '/vendor');
require.paths.unshift(VENDOR_PATH);
var io = require('socket.io-node/lib/socket.io');

var LIB_PATH = fs.realpathSync(__dirname + '/lib');
require.paths.unshift(LIB_PATH);

var app = require('translink');

server = http.createServer(function(req, res){
    // your normal server code
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Welcome to the planet of left socks.');
    res.end();
});

server.listen(8080);

var buffer = [], json = JSON.stringify;

io.listen(server, {
    onClientConnect: function(client) {
	D(client)
        client.send({connection_id: client.sessionId});
    },
    onClientDisconnect: function(client) {
        client.broadcast(json({ announcement: client.sessionId + ' disconnected' }));
    },
    onClientMessage: function(message, client) {
        /* we expect JSON always */
	sys.puts("got here...");
	D(message);
        try {
            var payload = JSON.parse(message);
        }
        catch(e) {
            log("Unable to parse JSON: " + message.slice(0, 255));
            // disconnect the client?
            return;
        }        

        if (typeof(payload.method) === "undefined") {
            log("Invalid message format - missing method.");
            return;
        }
        else {
            log('should fucking emit this');
            app.emit(payload.method, payload.params, payload.id);
            return;
        }
    }
});
