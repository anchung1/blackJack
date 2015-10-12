var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var CHANGE_SOCK_MSG = 'change_sock_msg';

var _store = {
    item: {},
    sockMsg: ''
};

var addItem = function(item){
    _store.item = item;
};

var sockMsg = function(data) {
    _store.sockMsg = data;
};

var sampleStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb) {
        this.on(CHANGE_EVENT, cb);
    },
    removeChangeListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },
    getItem: function() {
        return _store.item;
    },

    addSockMsgListener: function(cb) {
        this.on(CHANGE_SOCK_MSG, cb);
    },
    removeSockMsgListener: function(cb) {
        this.removeListener(CHANGE_SOCK_MSG, cb);
    },
    getSockMsg: function() {
        return _store.sockMsg;
    }

});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.SAMPLE_ITEM:
            addItem(action.data);
            sampleStore.emit(CHANGE_EVENT);
            break;
        case appConstants.SOCKET_MSG:
            sockMsg(action.data);
            sampleStore.emit(CHANGE_SOCK_MSG);
            break;

        default:
            return true;
    }
});

module.exports = sampleStore;