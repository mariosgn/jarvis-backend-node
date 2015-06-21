
function modulecore_listactive()
{
    o = {
        "module": "core",
        "action": "listactive"
    };
    setAndSend(o)
}

function modulecore_ping()
{
    o = {
        "module": "core",
        "action": "ping"
    };
    setAndSend(o)
}

function modulecore_gettime()
{
    o = {
        "module": "core",
        "action": "gettime"
    };
    setAndSend(o)
}