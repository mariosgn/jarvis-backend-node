var util = require('util');
var EventEmitter = require('events').EventEmitter;

modules = []


function Module(n) {
    this.name = n
    this.counter = 0
}

util.inherits(Module, EventEmitter);

Module.prototype.init = function(message) {
    console.log("INIT: "+this.name);
    this.on('message', this.receivedMessage);
};


Module.prototype.receivedMessage = function(message) {
    console.log("receivedMessage "+this.name);
    return this.name;
};

Module.prototype.handleMessage = function(message) {

    if (message.content.action)
    {
        fn = message.content.action.charAt(0).toUpperCase() + message.content.action.slice(1)
        if( typeof this["on"+fn] === 'function' )
        {
            this["on"+fn](message);
            return;
        }
    }

    //console.log("handleMessage "+this.name);
    this.emit('message', message);
    return this.name;
};

function ModuleRam (n)
{
    Module.call(this, n);
}

util.inherits(ModuleRam, Module);


ModuleRam.prototype.receivedMessage = function(message) {
    console.log("ModuleRam receivedMessage "+this.name);
    return this.name;
};
ModuleRam.prototype.onListactive = function(message) {
    console.log("qadasdas")
    r = message.reply();
    r.content.modules = []
    for (var i = 0, l = modules.length; i < l; i++) {
        r.content.modules.push( modules[i].name)
    }
    r.send();
};



exports.init = function() {
    modules.push( new Module("modulo1"));
    modules.push( new Module("modulo2"));
    modules.push( new Module("modulo3"));
    modules.push( new ModuleRam("moduloram"));

    modules[0].init();
    modules[1].init();
    modules[2].init();
    modules[3].init();
};

exports.use = function( client, moduleName ) {
    console.log("asd");
    return false;
};

exports.release = function( client, moduleName ) {
    return false;
};

exports.moduleExists = function( moduleName ) {
    for (var i = 0, l = modules.length; i < l; i++) {
        if ( modules[i].name == moduleName )
            return modules[i];
    }
    return false;
};

exports.dispatchMessage = function( message ) {

    if (!message.content.module)
    {
        console.log("error no module set")
        return
    }

    if (message.content.module=="core")
    {
        console.log("core module called")
        return
    }

    //silently exit
    module = this.moduleExists( message.content.module );
    if (!module)
    {
        console.log("module "+message.content.module+" not found")
        return
    }

    module.handleMessage(message);
    //counter = module.counter++;
};