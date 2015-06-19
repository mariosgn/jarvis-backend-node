var Module = require('./module');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function ModuleCore ()
{
    Module.call(this, "core");
}
util.inherits(ModuleCore, Module);

ModuleCore.prototype.receivedMessage = function(message) {
    console.log("ModuleCore receivedMessage "+this.name);
    return this.name;
};

ModuleCore.prototype.onListactive = function(message) {
    r = message.reply();
    r.content.modules = []
    for (var i = 0, l = modules.length; i < l; i++) {
        r.content.modules.push( modules[i].name)
    }
    r.send();
};

module.exports = ModuleCore;