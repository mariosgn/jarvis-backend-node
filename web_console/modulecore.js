
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