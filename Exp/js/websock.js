var sio = require('socket.io');
var _ = require('lodash');

'use strict';

function webSock(server) {
    this.io = sio(server);
    this.sockets = [];

    this.io.on('connection', function(socket) {
        console.log('a user connected');


        var index = _.findIndex(this.sockets, function(sock) {
            return sock.id == socket.id;
        });

        if (index < 0) {
            this.sockets.push(socket);
        }


        socket.on('disconnect', function() {
            console.log('user disconnected');
        });

        socket.on('event', function(msg) {

            this.sockets.forEach(function(sock) {
                if (sock.id == socket.id) return;
                sock.emit('event', msg);
            });


            /*console.log(socket.id);
            socket.emit('event', msg);*/
        }.bind(this));
    }.bind(this));

    this.sayHello = function() {
        console.log('Web Socket Active.');
    };

}


module.exports = webSock;