# Jarvis Backend Node
First node implementation of the [jarvis](http://mariosgn.github.io/jarvis-backend-node/) protocol.

# Quick install
This is a beta version, with also a beta installation process: just to have a look.

```bash
    cd /tmp/
    mkdir jarvis
    cd jarvis
    npm install git+https://git@github.com/mariosgn/jarvis-backend-node 
    ./node_modules/.bin/jarvis
```

Now you should be able to use the daemon.

Download the console and the demo view:

```bash
    cd /tmp/jarvis
    git clone https://git@github.com/mariosgn/jarvis-backend-node
    firefox jarvis-backend-node/harmattan-like-demo/index.html
```

When you run firefox/chromium/whatever, be sure that the daemon is running.

If you see the right current time in the browser view, it means the everything went fine.


**Note:** the forecast module relies on forecast.io service, thus it needs an api key. 
You have to get one for free at [developer.forecast.io](/https://developer.forecast.io/).
Once you have it, write it in a json file:
```bash
    mkdir -p ~/.config/jarvis/modules/
    echo '{  "forecastio_key": "putyourapikeyhere" }' > ~/.config/jarvis/modules/forecast.json
```
Then restart the jarvis nodejs daemon.

Now you should install the [qtview](https://github.com/mariosgn/jarvis-gui-webkit).

# Docs
Still in beta [here](http://mariosgn.github.io/jarvis-backend-node/)
