
function moduleram_ping()
{
    o = {
        "module": "ram",
        "action": "ping"
    };
    setAndSend(o)
}


function moduleram_listen()
{
    o = {
        "module": "ram",
        "action": "listen"
    };
    setAndSend(o)
}

function moduleram_unlisten()
{
    o = {
        "module": "ram",
        "action": "unlisten"
    };
    setAndSend(o)
}

function moduleram_test()
{
    o = {
        "module": "ram",
        "action": "test"
    };
    setAndSend(o)
}

function moduleram_setperiod()
{
    o = {
        "module": "ram",
        "action": "setperiod",
        "period": 2000
    };
    setAndSend(o)
}

function moduleram_getactions()
{
    o = {
        "module": "ram",
        "action": "getactions"
    };
    setAndSend(o)
}