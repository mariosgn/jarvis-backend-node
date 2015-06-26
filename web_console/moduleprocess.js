function moduleprocess_ping()
{
    o = {
        "module": "process",
        "action": "ping"
    };
    setAndSend(o)
}

function moduleprocess_setperiod()
{
    o = {
        "module": "process",
        "action": "setperiod",
        "period": 1000
    };
    setAndSend(o)
}

function moduleprocess_listen()
{
    o = {
        "module": "process",
        "action": "listen"
    };
    setAndSend(o)
}

function moduleprocess_unlisten()
{
    o = {
        "module": "process",
        "action": "unlisten"
    };
    setAndSend(o)
}



function moduleprocess_getinfo()
{
    o = {
        "module": "process",
        "action": "getinfo"
    };
    setAndSend(o)
}

function moduleprocess_getactions()
{
    o = {
        "module": "process",
        "action": "getactions"
    };
    setAndSend(o)
}