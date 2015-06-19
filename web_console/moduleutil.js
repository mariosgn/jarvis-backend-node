
function moduleutil_sendinvalid()
{
    $('#jsonval').prop('value', "test invalid")
    jarvisWs.send($('#jsonval').prop('value'));
}

function moduleutil_sendinvalidmessage()
{
    o = {
        "test": "yes"
    };
    setAndSend(o)
}

function moduleutil_callinvalidmodule()
{
    o = {
        "module": "yeahmodule"
    };
    setAndSend(o)
}