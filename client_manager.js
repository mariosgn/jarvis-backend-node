var moduleManager = require('./module_manager');

function JarvisMessage() {
    this.receiver_clients = [] //if empty it's a broadcast message, otherwise the clients interester
    this.sender_client = null
    this.content = {}
}

JarvisMessage.prototype.addClient = function(c) {
    this.receiver_clients.push(c)
};

JarvisMessage.prototype.reply = function() {
    m = new JarvisMessage();
    m.receiver_clients.push( this.sender );

    //copy some of the request info
    m.content.module = this.content.module;
    if ( this.content.hasOwnProperty("module") )
        m.content.action = this.content.action;

    return m
};

JarvisMessage.prototype.replyError = function( err ) {
    m = this.reply();
    m.content.error = true;
    m.content.error_id = err;
    return m;
};

JarvisMessage.prototype.stringify = function() {

    return JSON.stringify(this.content);
};

JarvisMessage.prototype.send = function() {

    for (var i = 0, l = this.receiver_clients.length; i < l; i++) {
        this.receiver_clients[i].conn.send( this.stringify() );
    }
};


JarvisMessage.prototype.parseBuff = function(c) {

    try {
        this.content = JSON.parse(c)
    } catch (e) {
        return false;
    }
    return true;
};

JarvisMessage.prototype.dispatch = function() {
     moduleManager.dispatchMessage(this)
};



function Client( connx ) {
    this.id = 0;
    this.conn = connx;
    c = this;
    connx.on('message', function incoming(message) {
        c.handleClientMessage(message);
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






var clientList = [];

exports.createClient = function (conn) {
    c = new Client( conn );
    c.id = clientList.push(c);
};

exports.getClient = function (c) {
    return clientList[c];
};
