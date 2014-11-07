//var init = function () {
var fs = require('fs'),
    path = require('path'),
    appPath = path.dirname(require.main.filename), //The use of appPath would appear uneccessary until you're running in a fully compiled NWK environment, but is needed then; at least on Windows.
    Hapi = require("hapi"),
    Joi = require("joi"),
    pkg = require(appPath + '/package.json');

    app = new Hapi.Server(process.env.APP_PORT || 8883, {
        // // If the main page were https, your Socket.IO needs to be https also without some added hackery which may be addressed soon by: https://github.com/rogerwang/node-webkit/issues/1113#issuecomment-58616279
        // tls: {
        //     key: fs.readFileSync(appPath+'/localhost.key'),
        //     cert: fs.readFileSync(appPath+'/localhost.cert'),
        //     requestCert: false,
        //     rejectUnauthorized: true
        // }
    });

app.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
});

app.start(function(data) {
    console.log('app v' + pkg.version + ' running at:', app.info.uri);
    var io = require('socket.io').listen(app.listener),
        socketsHandler = require(appPath + '/sockets.js')(io);
});
