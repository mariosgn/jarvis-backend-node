var moduleManager = require('./module_manager');
var Module = require('./module');


function JarvisMessage(mod, cnt) {
    this.receiver_clients = [] //if empty it's a broadcast message, otherwise the clients interester
    this.sender = null
    this.content = {}

    if ( mod instanceof Module )
    {
        this.receiver_clients = mod.clientListener
        this.content.module = mod.name
    }

    for (var attrname in cnt) {
        this.content[attrname] = cnt[attrname];
    }
}

JarvisMessage.prototype.addClient = function(c) {
    this.receiver_clients.push(c)
};

JarvisMessage.prototype.reply = function( cnt ) {
    m = new JarvisMessage();
    m.receiver_clients.push( this.sender );

    //copy some of the request info
    m.content.module = this.content.module;
    if ( this.content.hasOwnProperty("module") )
        m.content.action = this.content.action;

    for (var attrname in cnt) {
        m.content[attrname] = cnt[attrname];
    }
    return m
};

JarvisMessage.prototype.replyError = function( err ) {
    m = this.reply();
    m.content.error = true;
    m.content.error_id = err;
    return m;
};

JarvisMessage.prototype.replyOk = function( cnt ) {
    m = this.reply(cnt);
    m.content.result = "ok";
    return m;
};

JarvisMessage.prototype.stringify = function() {

    return JSON.stringify(this.content);
};

JarvisMessage.prototype.send = function() {

    for (var i = 0, l = this.receiver_clients.length; i < l; i++) {
        c = this.receiver_clients[i];
        if (c)
            c.conn.send( this.stringify() );
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

module.exports = JarvisMessage;