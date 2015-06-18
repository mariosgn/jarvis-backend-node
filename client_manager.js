var moduleManager = require('./module_manager');

function JarvisMessage() {
    this.receiver_clients = [] //if empty it's a broadcast message, otherwise the clients interester
    this.sender_client = null
    this.content = null

}

JarvisMessage.prototype.addClient = function(c) {
    this.receiver_clients.push(c)
};

JarvisMessage.prototype.parseBuff = function(c) {

    console.log("prima")
    try {
        JSON.parse(c)
    } catch (e) {
        return false;
    }
    console.log("dopo")
    this.content = JSON.parse(c)
    return true;
};

JarvisMessage.prototype.dispatch = function() {
    /*if module == core....*/
    moduleManager.dispatchMessage(this)
};



function Client( connection ) {
    this.id = 0;
    this.connection = connection;
    connection.on('message', this.handleClientMessage);

}

Client.prototype.handleClientMessage = function( data ) {
    message = new JarvisMessage();
    message.sender = this
    if ( message.parseBuff(data.utf8Data) )
    {
        message.dispatch();
    }
}




var clientList = [];

exports.createClient = function (connection) {
    c = new Client( connection );
    c.id = clientList.push(c);
};

exports.getClient = function (c) {
    return clientList[c];
};
