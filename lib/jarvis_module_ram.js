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


ModuleRam.prototype.setUpdatePeriod = function( p ) {
    if (this.timer)
    {
        clearInterval(this.timer);
    }
    var self = this;
    this.timer = setInterval( function(){
        self.checkRamUsage();
    }, p );
};

ModuleRam.prototype.onSetperiod = function(message) {
    if ( typeof message.content.period == 'number')
    {
        this.setUpdatePeriod( message.content.period );
        message.replyOk().send();
    }
    else
    {
        message.replyError("missing period").send();
    }
};


ModuleRam.prototype.onTest = function(message) {
    console.log("ModuleRam test "+this.name);
};


ModuleRam.prototype.checkRamUsage = function() {
    m = new JarvisMessage(this, {"actions":"sticazzi","counter":this.counter++});
    m.send();
};

module.exports = ModuleRam;