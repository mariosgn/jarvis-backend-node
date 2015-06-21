var moduleManager = require('./lib/module_manager');
moduleManager.init();

var clientManager = require('./lib/client_manager');

var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: 8080 });


wss.on('connection', function connection(ws) {
    clientManager.createClient( ws );
});