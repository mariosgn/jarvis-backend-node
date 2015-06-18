var moduleManager = require('./module_manager');

function JarvisMessage() {
    this.receiver_clients = [] //if empty it's a broadcast message, otherwise the clients interester
    this.sender_client = null
    this.content = null
}

JarvisMessage.prototype.addClient = function(c) {
    this.receiver_clients.push(c)
};

JarvisMessage.prototype.reply = function() {
    m = new JarvisMessage();
    m.receiver_clients.push( this.sender );
    return m
};

JarvisMessage.prototype.replyError = function( err ) {
    m = this.reply();
    m.content.error = true;
    m.content.error_type = err;
    return m;
};

JarvisMessage.prototype.stringify = function() {

    return JSON.stringify(this.content);
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



function Client( conn ) {
    this.id = 0;
    this.conn = conn;
    //conn.on('message', this.handleClientMessage);
    conn.on('message',
        function( data ) {
            console.log(this.conn)
        });

        //message.dispatch();

}

Client.prototype.handleClientMessage = function( data ) {
   // message = new JarvisMessage();
   // message.sender = this
    console.log(this.conn)
   // if ( !message.parseBuff(data.utf8Data) )
    {

        //message.utf8Data
//        this.connection.sendUTF( message.replyError(1).stringify() );
   //     return;
    }

    //message.dispatch();
}




var clientList = [];

exports.createClient = function (conn) {
    c = new Client( conn );
    c.id = clientList.push(c);
    console.log(c.conn)
};

exports.getClient = function (c) {
    return clientList[c];
};
