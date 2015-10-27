var sio = require('socket.io');
var _ = require('lodash');
var aRoom = require('./room');

'use strict';

function roomControl() {
    this.sockets = [];
    this.gameRooms = [];


    this.checkAndSaveSocket = function(socket) {
        var index = _.findIndex(this.sockets, function(sock) {
            return sock.id == socket.id;
        });

        if (index < 0) {
            this.sockets.push({socket: socket, room: null});
        }
    };

    this.findSocket = function(socket) {

        var index = _.findIndex(this.sockets, function(sock) {
            return (sock.socket.id == socket.id);
        });

        return index;
    };

    this.findRoom = function(socket) {

        var index = this.findSocket(socket);
        if (index < 0) return null;
        return this.sockets[index].room;
    };

    this.removeRoom = function(socket) {

        var room = this.findRoom(socket);
        if (!room) {
            return;
        }

        room.leaveRoom(socket);

        //handle garbage collection
        if (room.numPeople == 0) {
            var removedRoom = _.remove(this.gameRooms, function(elem) {
                return (elem.roomName == room.roomName);
            });

            if (removedRoom.length > 0) {
                console.log('' + room.roomName + " removed.");
            }
        }
    };

    this.joinRoom = function(socket, name) {
        this.removeRoom(socket);
        var gameRoom = {};

        var index = _.findIndex(this.gameRooms, function(room) {
            return (room.roomName == name);
        });

        if (index < 0) {
            gameRoom = new aRoom(name);
            this.gameRooms.push(gameRoom);
        } else {
            gameRoom = this.gameRooms[index];
        }

        index = this.findSocket(socket);
        if (index < 0) {
            console.log('socket not found: ' + socket.id);

            this.sockets.forEach(function(sock) {
                console.log(sock.socket.id);
            });
            return;
        }

        this.sockets[index].room = gameRoom;
        gameRoom.joinRoom(socket);


    };

    this.emitChat = function(eventId, msg, socket) {
        var room = this.findRoom(socket);

        if (room) {
            room.emit('event', msg, socket);
        } else {
            var index = this.findSocket(socket);
            var roomName = '';

            console.log('Error: ');
            this.sockets.forEach(function(sock, i) {
                roomName = '';
                if (sock.room) roomName = sock.room.roomName;
                if (index == i) {
                    console.log('**' + sock.socket.id + ' ' + roomName);

                } else {
                    console.log('' + sock.socket.id + ' ' + roomName);
                }
            });

        }
    };


    this.emitRoom = function(eventId, roomName, socket) {
        //joinRoom handles both joins and leaves
        this.joinRoom(socket, roomName);

    };
}

function webSock(server) {
    var io = sio(server);
    var rctrl = new roomControl();

    io.on('connection', function(socket) {
        console.log('a user connected');

        rctrl.checkAndSaveSocket(socket);
        rctrl.joinRoom(socket, "Lobby");

        socket.on('disconnect', function() {
            console.log('user disconnected');
        });

        socket.on('event', function(msg) {
            rctrl.emitChat('event', msg, socket);
        });

        socket.on('room', function(roomName) {
            rctrl.emitRoom('room', roomName, socket);
        });

    });

}


module.exports = webSock;