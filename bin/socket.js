module.exports = function(server) {
    var io = require('socket.io').listen(server);

    io.sockets.on('connection', function (socket) {
        var send = false;
        if (send){
            var something = {
                "name":"your name"
            };
            socket.volatile.emit('notification', something);
        }
    });
};