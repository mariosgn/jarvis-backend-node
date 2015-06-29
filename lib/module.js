var util = require('util');
var EventEmitter = require('events').EventEmitter;
var basedir = require("xdg").basedir;
var fs = require('fs');
var logger = require(__dirname+'/jarvislog');

function Module(n) {
    this.name = n
    this.counter = 0
    this.clientListener = []
    this.timer = null;
    this.config = null;
}

util.inherits(Module, EventEmitter);

Module.prototype._init = function (cb) {
    //console.log("INIT: "+this.name);
    this.on('message', this.receivedMessage);

    var configPath = basedir.configPath("jarvis/modules");
    var configFile = configPath + "/" + this.name + ".json";
    var self = this;

    fs.stat(configFile, function (err, stat) {
        if (err == null) {
            fs.readFile(configFile, 'utf8', function (err, data) {
                if (!err) {

                    try {
                        self.config = JSON.parse(data);
                    } catch (e) {
                        cb("Error parsing json file: " + configFile);
                        return;
                    }
                    logger.info("Module " + self.name + " configjson file loaded");

                    logger.info("Module " + typeof self["onGetinfo"]);

                    if (typeof self["Init"] === 'function') {
                        self["Init"](cb);
                        return;
                    }
                    else {
                        cb(null, self);
                    }
                }
            });
        } else {
            cb(null, self);
        }
    });


};


Module.prototype.receivedMessage = function (message) {
    console.log("receivedMessage " + this.name);
};

Module.prototype.handleMessage = function (message) {

    if (message.content.action) {

        if (message.content.action == "listen") {
            idx = this.clientListener.indexOf(message.sender)
            if (idx < 0) {
                this.clientListener.push(message.sender);
                message.replyOk().send();
            }
            else {
                message.replyError("Already listening").send();
            }
            return;
        }
        else if (message.content.action == "unlisten") {
            idx = this.clientListener.indexOf(message.sender)
            if (idx >= 0) {
                this.clientListener.splice(idx, 1);
                message.replyOk().send();
            }
            else {
                message.replyError("Not listening").send();
            }

            return;
        }

        fn = message.content.action.charAt(0).toUpperCase() + message.content.action.slice(1)
        if (typeof this["on" + fn] === 'function') {
            this["on" + fn](message);
            return;
        }
    }

    //console.log("handleMessage "+this.name);
    this.emit('message', message);
    return;
};

Module.prototype.onPing = function (message) {
    r = message.reply({"pong": true}).send();
};


Module.prototype.setUpdatePeriod = function (p) {
    if (this.timer) {
        clearInterval(this.timer);
    }
    var self = this;
    this.timer = setInterval(function () {
        self.timerFunction();
    }, p);
};

Module.prototype.timerFunction = function () {

};


Module.prototype.onSetperiod = function (message) {
    if (typeof message.content.period == 'number') {
        this.setUpdatePeriod(message.content.period);
        message.replyOk().send();
    }
    else {
        message.replyError("missing period").send();
    }
};

Module.prototype.onGetactions = function (message) {
    m = message.replyOk();
    m.content.actions = [];
    for (var attrname in this) {
        if (attrname.length > 2 && attrname != "once" && attrname.slice(0, 2) == "on" &&
            typeof this[attrname] === 'function') {
            m.content.actions.push(attrname.slice(2).toLowerCase());
        }

    }
    m.content.actions.push("listen");
    m.content.actions.push("unlisten");
    m.send();
};


module.exports = Module;
