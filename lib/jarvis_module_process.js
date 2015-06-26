var Module = require('./module');
var JarvisMessage = require('./jarvismessage');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var os = require('os');
var osutils = require('os-utils');
var libfs = require('fs');
var exec = require('child_process').exec;

processes = [];


function ModuleProcess() {
    Module.call(this, "process");

    var self = this;
    this.cpuTimer = setInterval( function(){
        self.cpuProcessList();
    }, 1000 );

}
util.inherits(ModuleProcess, Module);


ModuleProcess.prototype.cpuProcessList = function (message) {
    exec('ps axo pcpu,pmem,command --sort -rss', function(error, result) {
        var pslines = result.split('\n');
        for (var i = 1 ; i< pslines.length, i<10; i++) {


            //I know.. i will rewrite this shit soon...
            regex = /^\s*(?:\d*\.)?\d+\s*(?:\d*\.)?\d+/gm;
            l = pslines[i]
            info = l.match(regex, "")
            cmd = l.slice(info[0].length).trim();

            infos = info[0].split(" ");
            infosF = []
            c = 0;
            for (var c = 0 ; c< infos.length; c++) {
                if (!isNaN(parseFloat(infos[c]))) {
                    infosF.push(parseFloat(infos[c]))
                }
            }

            cmdA = cmd
            if (cmdA.indexOf(" ")>=0) {
                cmdA = cmd.split(" ")[0];
            }

            if (cmdA.indexOf("/")>=0) {
                cmdB = cmdA.split("/");
                cmdA = cmdB[cmdB.length-1];
            }

            p ={
                "command" : cmdA,
                "cpu" : infosF[0],
                "mem" : infosF[1]
            }
            processes[i-1] = p;
        }
    });
};



ModuleProcess.prototype.timerFunction = function () {
    o = {
        "procs" : processes,
        "action" : "procstats"
    };
    m = new JarvisMessage(this, o );
    m.send();
};

module.exports = ModuleProcess;