var Module = require('./module');
var JarvisMessage = require('./jarvismessage');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var os = require('os');
var osutils = require('os-utils');
var libfs = require('fs');

cpu_usage = [];
cpu_usage_perc = [];

function ModuleOs() {
    Module.call(this, "os");

    cpus = os.cpus()
    for (var i = 0 ; i<= cpus.length; i++) {
        cpu_usage.push({"lastTotal":0,"lastLoad":0,"lastIdle":0});
        cpu_usage_perc.push(0);
    }

    var self = this;
    this.cpuTimer = setInterval( function(){
        self.cpuTimerFunction();
    }, 500 );

}
util.inherits(ModuleOs, Module);


ModuleOs.prototype.onSysteminfo = function (message) {
    o = {
        "hostname": os.hostname(),
        "type": os.type(),
        "platform": os.platform(),
        "release": os.release(),
        "uptime": os.uptime(),
        "loadavg": os.loadavg(),
        "loadavg": os.loadavg(),
        "freemem": os.freemem()
    }
    message.reply(o).send();
};

ModuleOs.prototype.onCpuinfo = function (message) {
    message.reply({"cpus": os.cpus()}).send();
};


var readStat = function (cb) {
    libfs.readFile("/proc/stat", function (err, data) {
        cb(data.toString());
    });
}

ModuleOs.prototype.cpuTimerFunction = function () {
    readStat( function (data) {
        var procStat = data.split('\n');

        for (var i = 0 ; i< procStat.length; i++) {

            if ( procStat[i].slice(0,3)=="cpu" )  {

                regex = /^([\w]+\ *)/igm;
                cpuInfo = procStat[i].replace(regex, "").split(" ");

                user = parseInt(cpuInfo[0]);
                nice  = parseInt(cpuInfo[1]);
                sys  = parseInt(cpuInfo[2]);
                idle = parseInt(cpuInfo[3]);
                iowa = parseInt(cpuInfo[4]);

                total = user+nice+sys;
                load = 0;

                if ( cpu_usage[i].lastTotal != 0 ) {
                    load = Math.round( ( total - cpu_usage[i].lastTotal ) / ( total + idle - cpu_usage[i].lastTotal - cpu_usage[i].lastIdle ) * 100 );
                }

                cpu_usage[i].lastIdle = idle;
                cpu_usage[i].lastTotal = total;
                cpu_usage[i].lastLoad = load;

                cpu_usage_perc[i]=load;
                //console.log(i+" cpu "+load);
            }
        }
    })

};



ModuleOs.prototype.timerFunction = function () {
    m = new JarvisMessage(this, cpu_usage_perc);
    m.send();
};

module.exports = ModuleOs;