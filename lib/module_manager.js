var Module = require('./module');
var ModuleCore = require('./jarvis_module_core');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

modules = []

exports.init = function() {
    core = new ModuleCore();
    core.init();
    modules.push(core);
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

exports.moduleLoad = function( moduleName ) {

    //console.log("try to load "+moduleName);
    //TODO: module path
    modName = "./jarvis_module_"+moduleName.toLowerCase();
    module = null

    try {
        module = require( modName );
    } catch(err) {
        console.log( "module not loaded " + modName);
        return false;
    }


    m = new module();
    m.init();
    modules.push( m );


    return m;
};

exports.dispatchMessage = function( message ) {

    if (!message.content.module)
    {
        message.replyError("No module set").send();
        return
    }


    module = this.moduleExists( message.content.module );

    if (!module)
    {
        module = this.moduleLoad( message.content.module )
        if ( !module )
        {
            message.replyError("module "+message.content.module+" not found").send();
            return;
        }
    }

    module.handleMessage(message);
};


exports.clientDisconnected = function( c ) {
    for (var i = 0, l = modules.length; i < l; i++) {
        idx = modules[i].clientListener.indexOf(c)
        if (idx>=0) {
            modules[i].clientListener.splice(idx, 1);
        }
    }
};