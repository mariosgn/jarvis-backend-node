var moduleManager = require('./module_manager');
var JarvisMessage = require('./jarvismessage');


function Client( connx ) {
    this.id = 0;
    this.conn = connx;
    c = this;
    connx.on('message', function incoming(message) {
        c.handleClientMessage(message);
    });
    connx.on('close', function close() {
        c.closeClient();
    });
}

Client.prototype.handleClientMessage = function( data ) {
    message = new JarvisMessage();
    message.sender = this
    if ( !message.parseBuff(data) )
    {
        this.conn.send( message.replyError("Invalid request").stringify() );
        return;
    }
    message.dispatch();
}


Client.prototype.closeClient = function( data ) {
  //TODO: remove from array
    moduleManager.clientDisconnected(this);
}



var clientList = [];

exports.createClient = function (conn) {
    c = new Client( conn );
    c.id = clientList.push(c);
};

exports.getClient = function (c) {
    return clientList[c];
};
