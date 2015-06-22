var Module = require('./module');
var JarvisMessage = require('./jarvismessage');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var os = require('os');
var osutils  = require('os-utils');

function ModuleOs ()
{
    Module.call(this, "os");
    this.counter = 1;

}
util.inherits(ModuleOs, Module);


ModuleOs.prototype.onSysteminfo = function( message ) {
    o = {
        "hostname": os.hostname(),
        "type": os.type(),
        "platform": os.platform(),
        "release":os.release(),
        "uptime":os.uptime(),
        "loadavg":os.loadavg(),
        "loadavg":os.loadavg(),
        "freemem":os.freemem()
    }
    message.reply(o).send();
};

ModuleOs.prototype.onCpuinfo = function( message ) {
    message.reply({"cpus":os.cpus()}).send();
};



ModuleOs.prototype.timerFunction = function() {


};

module.exports = ModuleOs;