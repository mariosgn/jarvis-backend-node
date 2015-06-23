var jarvisWs;
var jarvisStatus;

var forecast_icons = [];

//forecast_icons[" "] = "0.png"
forecast_icons["rain"] = "11.png"
forecast_icons["snow"] = "13.png"
forecast_icons["sleet"] = "13.png"
//forecast_icons[" "] = "1.png"
forecast_icons["fog"] = "24.png"
forecast_icons["cloudy"] = "26.png"
forecast_icons["partly-cloudy-night"] = "27.png"
forecast_icons["partly-cloudy-day"] = "28.png"
//forecast_icons[" "] = "29.png"
//forecast_icons[" "] = "30.png"
forecast_icons["clear-night"] = "31.png"
//forecast_icons[" "] = "3200.png"
forecast_icons["clear-day"] = "34.png"
forecast_icons["wind"] = "34.png"
//forecast_icons[" "] = "8.png"



function websocketConnect(fn) {
    jarvisWs = new WebSocket('ws://localhost:8080', "jarvis-protocol");

    jarvisWs.onmessage = function (event) {
        m = JSON.parse(event.data);
        jarvisHandleMessage(m);
    }
    jarvisWs.onopen = function () {
        jarvisStatus = true;
        jarvisStart();
    }
    jarvisWs.onclose = function () {
        jarvisStatus = false;
    }
    jarvisWs.onerror = function () {

    }
}

window.onload = websocketConnect()


var clockTimer;
var forecastTimer;
function jarvisStart() {

    $('#time_row').hide();
    $('#forecast_row').hide();
    $('#system_row').hide();

    jarvisSendObj({"module": "os", "action": "cpuinfo"});
    jarvisSendObj({"module": "os", "action": "listen"});
    jarvisSendObj({"module": "os", "action": "setperiod", "period": 2000});
    jarvisSendObj({"module": "forecast", "action": "getinfo", "latitude":"45.4521179", "longitude":"9.1448667"});
    clockTimer = setInterval(function () {

        jarvisSendObj({"module": "core", "action": "gettime"});

    }, 1000);
    firecastTimer = setInterval(function () {

        jarvisSendObj({"module": "forecast", "action": "getinfo", "latitude":"45.4521179", "longitude":"9.1448667"});

    }, 1000*60*10);
}


function jarvisSendObj(o) {
    jarvisWs.send(JSON.stringify(o, null, 4));
}

function jarvisHandleMessage(m) {
    if (m.module == "core") {
        if (m.action == "gettime") {
            //alert(m.time);
            d = new Date(m.time);
            hh = ("0" + d.getHours()).slice(-2);
            mm = ("0" + d.getMinutes()).slice(-2);

            $("#dtime").text(hh + " : " + mm);
            $("#ddate").text(d.toDateString());
            $("#time_row").show();

        }
    }
    else if (m.module == "os") {
        if (m.action == "cpuinfo") {
            for (var i = 0; i < m.cpus.length; i++) {
                n = i + 1;
                var cpu = $('<div  class="system_info_row"><div>Cpu ' + n + '</div>\
                            <div>\
                            <div class="progressbar">\
                            <div id="cpu_progress_' + n + '" class="progressbar_bar"></div>\
                            </div>\
                            </div>\
                            <div id="cpu_progress_text_' + n + '"></div></div>');
                $('#system_info_cpus').append(cpu);
            }
            $('#system_row').show();
        }
        else if (m.action == "cpustats") {
            $('#memory_usage').width("" + m.freemem + "%");
            $('#memory_usage_text').html(m.freemem);
            for (var i = 1; i < m.cpus.length; i++) {
                $('#cpu_progress_' + i).width("" + m.cpus[i] + "%");
                $('#cpu_progress_text_' + i).html("" + m.cpus[i] + "%");
            }

            function toHHMMSS(sec) {

                var hours = Math.floor(sec / 3600);
                var minutes = Math.floor((sec - (hours * 3600)) / 60);
                var seconds = sec - (hours * 3600) - (minutes * 60);
                var days = 0;

                if ( hours>24 ) {
                    rhours = hours%24;
                    days = (hours-rhours) /24;
                    hours = rhours;
                }

                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                var time = hours + 'h ' + minutes + ':' + seconds;
                if (days>0) {
                    time = days+"d "+time;
                }
                return time;
            }

            $('#os_uptime').html(toHHMMSS(m.uptime));
        }
    } else if (m.module == "forecast") {
        if (m.action == "getinfo") {
            tz = m.forecast.timezone.replace("/", " ");
            summar = m.forecast.currently.summary;
            temp = (m.forecast.currently.temperature- 32)/1.8;
            $('#forecast_summary').html(summar);
            $('#forecast_timezone').html(tz);

            $('#forecast_temp').html(parseInt( temp)+"&deg;");

            $('#forecast_pressure').html( m.forecast.currently.pressure );
            $('#forecast_hum').html( m.forecast.currently.humidity );
            $('#forecast_wind').html( m.forecast.currently.windSpeed );

            var weekday = new Array(7);
            weekday[0]=  "SUN";
            weekday[1] = "MON";
            weekday[2] = "TUE";
            weekday[3] = "WED";
            weekday[4] = "THU";
            weekday[5] = "FIR";
            weekday[6] = "SAT";

            for (var i = 0; i < m.forecast.daily.data.length , i<3; i++) {
                o = m.forecast.daily.data[i];
                var d = new Date(o.time*1000);

                tempMin = parseInt((o.temperatureMin-32)/1.8);
                tempMax = parseInt((o.temperatureMax-32)/1.8);

                $('#forecast_day_'+(i+1)+'_name').html( weekday[d.getDay() ] );
                $('#forecast_day_'+(i+1)+'_img').attr("src","images/"+forecast_icons[o.icon]);
                $('#forecast_day_'+(i+1)+'_temp').html( tempMin+"&deg / "+tempMax+"&deg"  );
            }

            $('#forecast_row').show();
        }
    }
}