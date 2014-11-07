module.exports = function(io) {

    var socketsHandler = {
            sockns: io.of('/somenamespace'),
            verbosity: 10
        },
        engineCall = null,
        defaultCollection = null;


    socketsHandler.sockns.on('connection', function(socket) {

        logFilter(2, 'nwkServer:sockns:connection');

        logFilter(2, 'nwkServer:sockns:emit:pong');
        emitFilter(5, socketsHandler.sockns, 'pong', {
            from: 'nwkServer'
        });

        socket.on('connect', function(data) {
            logFilter(10, 'sockns.on:connect', data);
        })
        .on('ping', function(data) {
            logFilter(10, 'sockns.on:ping', {
                data: data
            });
        })
        .on('disconnect', function() { //Take note of disconnects. Important to maintain vrapp singleton behavior
            console.log('player disconnected');
        });

    });

    setTimeout(function() {
            if ( socketsHandler.sockns ) {
            
            }
        }
        , 1000);


    function logFilter(verbosity, p1, p2, p3, p4, p5, p6, p7, p8) {
        if (typeof p2 === 'undefined') p2 = '';
        if (typeof p3 === 'undefined') p3 = '';
        if (typeof p4 === 'undefined') p4 = '';
        if (typeof p5 === 'undefined') p5 = '';
        if (typeof p6 === 'undefined') p6 = '';
        if (typeof p7 === 'undefined') p7 = '';
        if (typeof p8 === 'undefined') p8 = '';

        if (socketsHandler.verbosity >= verbosity) {
            console.log(p1, p2, p3, p4, p5, p6, p7, p8);
        }
    }

    function emitFilter(verbosity, socket, messageType, messageData) {
        if (socketsHandler.verbosity >= verbosity) {
            socket.emit(messageType, messageData);
        }
    }

    return socketsHandler;

};
