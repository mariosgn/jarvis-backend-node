var WebSocketServer = require('websocket').server;
var http = require('http');

var moduleManager = require('./module_manager');
moduleManager.init();


var clientManager = require('./client_manager');

var server = http.createServer(function(request, response) {
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

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);

            //mm.use(1, 2);

            //res = JSON.parse(message.utf8Data);

            //connection.sendUTF(message.utf8Data);

           /* setInterval(function() {
                connection.sendUTF(message.utf8Data);
            }, 1000);*/
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    /*connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });*/
});