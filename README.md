**nwk-socket.io**

Node-WebKit running a Hapi server, hosting Socket.io to demonstrate how NWK must be configured for this.

The key here is in package.json. Look at:

...
  "main" : "http://github.rainabba.me",
  "node-main": "index.js",
  "node-local": "rainabba.me",
...

"main" is what nwk will load into the "browser window". In my case, this is a public page that will try to load up socket.io from localhost:8883 which would be provided by this app if it were running (you can run directly as a node app for testing and to have acccess to the console). "node-main" tells nwk where the actual entry point is for the node app that will run the Hapi server that hosts socket.io. "node-local" may be required to deal with some cors issues, but I'm not clear on this even after getting things working.

In reality, this app isn't even about socket.io though it provides an example of how this can be done, but really it shows what I thought of as the most obvious use of nwk from the instant I heard of it; how to run a node-app locally, without the user needing to install node, and then displaying a real website (be it a remote OR one running in that node app).

The purpose of this approach is to be able to host a public site that will try to connect to a socket.io on localhost:8883 and if it's there, use that connection to communicate with an app running on the desktop with all the power of libuv; which I use to launch and manage a native app. This gives me one public web UI that can deal with any native platform through the abstraction provided by the locally running socket.io server. This way I can have a seperate nwk package for each platform and the the UI is consistent and reusable while the native bits can be anything needed for that platform.

**Installation** (node app only but can be packaged and run directly as a node-webkit app using [Node-WebKit](https://github.com/rogerwang/node-webkit) )

```
git clone https://github.com/rainabba/nwk-socket.io
cd nwk-socket.io
node injex.js
```

Then visit http://github.rainabba.me