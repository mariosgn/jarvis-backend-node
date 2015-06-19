var WebSocketServer = require('websocket').server;
var http = require('http');

var moduleManager = require('./module_manager');
moduleManager.init();


var clientManager = require('./client_manager');
/*
var server = http.createServer( function(request, response) {
    console.log((new Date()) + ' ------------- Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});


server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production 
    // applications, as it defeats all standard cross-origin protection 
    // facilities built into the protocol and the browser.  You should 
    // *always* verify the connection's origin and decide whether or not 
    // to accept it. 
    autoAcceptConnections: false
});



wsServer.on('request', function(request) {
    var connection = request.accept('echo-protocol', request.origin);
    clientManager.createClient(connection);
});
*/


var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: 8080 });



wss.on('connection', function connection(ws) {


   clientManager.createClient(ws);



    /*ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });*/

    //ws.send('something');
});