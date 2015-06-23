var Module = require('./module');
var logger = require('./jarvislog');

modules = []

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

exports.loadModule = function( moduleName, cb ) {

    //console.log("try to load "+moduleName);
    //TODO: module path
    modName = "./jarvis_module_"+moduleName.toLowerCase();;
    module = null

    try {
        module = require( modName );
    } catch(err) {
        console.log( "module not loaded " + moduleName);
        cb( "module not loaded " + moduleName, null );
    }

    m = new module();
    modules.push( m );
    m.init(cb);

};

exports.init = function() {

    exports.loadModule("core", function(err, module){
        if(err){
            logger.info( "Module core failed to load: "+err );
        }
    });

};


exports.dispatchMessage = function( message ) {

    if (!message.content.module)
    {
        message.replyError("No module set").send();
        return
    }


    module = this.moduleExists( message.content.module );

    if ( module ) {
        module.handleMessage(message);
    } else {
        this.loadModule( message.content.module, function(err, mod){
            if (err) {
                message.replyError({"error":err}).send();
            }
            else {
                mod.handleMessage(message);
            }

        });
    }
};


exports.clientDisconnected = function( c ) {
    for (var i = 0, l = modules.length; i < l; i++) {
        idx = modules[i].clientListener.indexOf(c)
        if (idx>=0) {
            modules[i].clientListener.splice(idx, 1);
        }
    }
};