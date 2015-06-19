function moduleos_ping()
{
    o = {
        "module": "os",
        "action": "ping"
    };
    setAndSend(o)
}

function moduleos_setperiod()
{
    o = {
        "module": "os",
        "action": "setperiod",
        "period": 1000
    };
    setAndSend(o)
}

function moduleos_listen()
{
    o = {
        "module": "os",
        "action": "listen"
    };
    setAndSend(o)
}

function moduleos_unlisten()
{
    o = {
        "module": "os",
        "action": "unlisten"
    };
    setAndSend(o)
}

function moduleos_systeminfo()
{
    o = {
        "module": "os",
        "action": "systeminfo"
    };
    setAndSend(o)
}


function moduleos_cpuinfo()
{
    o = {
        "module": "os",
        "action": "cpuinfo"
    };
    setAndSend(o)
}