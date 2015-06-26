var Module = require('./module');
var JarvisMessage = require('./jarvismessage');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Forecast = require('forecast.io');
var logger = require('./jarvislog');


forecast = null;

function ModuleForecast() {
    Module.call(this, "forecast");
}
util.inherits(ModuleForecast, Module);

ModuleForecast.prototype.Init = function (cb) {

    var options = {
            APIKey: this.config.forecastio_key,
            timeout: 1000
        };
    forecast = new Forecast(options);

    cb(null, this);
}

ModuleForecast.prototype.onYeah = function (message) {

}

ModuleForecast.prototype.onGetinfo = function (message) {

    if (!message.content.hasOwnProperty("latitude") || !message.content.hasOwnProperty("longitude")) {
        message.replyError("Invalid request: latitude/longitude missing").send();
        return;
    }

    if (message.content.hasOwnProperty("time")) {
        forecast.get(message.content.latitude, message.content.longitude, message.content.time, function (err, res, data) {
            if (err) {
                //TODO: better error handling
                message.replyError("Cannot retreive forecast").send();
                return;
            }
            ;
            message.reply({"forecast": data}).send();
        });
    } else {
        forecast.get(message.content.latitude, message.content.longitude, function (err, res, data) {
            if (err) {
                //TODO: better error handling
                message.replyError("Cannot retreive forecast").send();
                return;
            }
            ;
            message.reply({"forecast": data}).send();
        });
    }
};

module.exports = ModuleForecast;