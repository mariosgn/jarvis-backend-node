var moduleManager = require('./module_manager');
var JarvisMessage = require('./jarvismessage');


function Client( connection ) {
    this.id = 0;
    this.conn = connection;

    //...not sure about that!
    connection._client = this;
    connection.on('message', function (message) {
        this._client.handleClientMessage(message);
    });
    connection.on('close', function close() {
        this._client.closeClient();
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
    newclient = new Client( conn );
    newclient.id = clientList.push(newclient);
};





/*
function Client( connection ) {
    this.id = 0;
    this.conn = connection;

    connection._client = this;
    connection.on('message', function (message) {
        this._client.handleClientMessage(message);
    });
}

Client.prototype.handleClientMessage = function( data ) {
    console.log("client id: "+this.id );
    return;
}


var clientList = [];
exports.createClient = function ( conn ) {
    newclient = new Client( conn );
    newclient.id = clientList.push(newclient);
};
*/