var Module = require('./module');
var JarvisMessage = require('./jarvismessage');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function ModuleRam ()
{
    Module.call(this, "ram");
    this.counter = 1;
    this.timer = null;

    this.setUpdatePeriod(1000);
}
util.inherits(ModuleRam, Module);

ModuleRam.prototype.receivedMessage = function(message) {
    console.log("ModuleRam receivedMessage "+this.name);
    return this.name;
};

module.exports = ModuleRam;