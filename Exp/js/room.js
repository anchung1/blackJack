var _ = require('lodash');

'use strict';

function Room(name) {

    this.roomName = name;
    this.numPeople = 0;
    this.socketList = [];

    this.joinRoom = function(socket) {
        console.log('Joining Room ' + this.roomName);
        this.numPeople++;
        this.socketList.push(socket);
    };

    this.leaveRoom = function(socket) {
        var leave = _.remove(this.socketList, function(sock) {
            return sock.id == socket.id;
        });

        if (leave.length > 0) {
            this.numPeople--;
            console.log('Leaving Room ' + this.roomName);
        }
    };

    this.displayIds = function() {
        this.socketList.forEach(function(sock) {
            console.log(sock.id);
        });
    };

    this.emit = function (eventId, msg, socket) {

        console.log('room emit');
        this.socketList.forEach(function(sock) {
            if (sock.id == socket.id) return;
            sock.emit('event', msg);
        });

    }
}


module.exports = Room;