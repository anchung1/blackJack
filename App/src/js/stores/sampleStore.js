var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
    item: {}
};

var addItem = function(item){
    _store.item = item;
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
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType){
        case appConstants.SAMPLE_ITEM:
            addItem(action.data);
            sampleStore.emit(CHANGE_EVENT);
            break;
        default:
            return true;
    }
});

module.exports = sampleStore;