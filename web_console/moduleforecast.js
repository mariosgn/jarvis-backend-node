
function moduleforecast_ping()
{
    o = {
        "module": "forecast",
        "action": "ping"
    };
    setAndSend(o)
}


function moduleforecast_listen()
{
    o = {
        "module": "forecast",
        "action": "listen"
    };
    setAndSend(o)
}

function moduleforecast_unlisten()
{
    o = {
        "module": "forecast",
        "action": "unlisten"
    };
    setAndSend(o)
}

function moduleforecast_setperiod()
{
    o = {
        "module": "forecast",
        "action": "setperiod",
        "period": 2000
    };
    setAndSend(o)
}

function moduleforecast_getactions()
{
    o = {
        "module": "forecast",
        "action": "getactions"
    };
    setAndSend(o)
}

function moduleforecast_getinfo()
{
    o = {
        "module": "forecast",
        "action": "getinfo",
        "latitude" : "37.8267",
        "longitude" : "-122.423",
        "messageid" : Math.floor((Math.random() * 1000) + 1)
    };
    setAndSend(o)
}

function moduleforecast_getinfotomorrow()
{
    o = {
        "module": "forecast",
        "action": "getinfo",
        "latitude" : "37.8267",
        "longitude" : "-122.423",
        "messageid" : Math.floor((Math.random() * 1000) + 1)
    };
    setAndSend(o)
}