var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var sampleActions = {
    anAction: function(item){
        AppDispatcher.handleAction({
            actionType: appConstants.SAMPLE_ITEM,
            data: item
        });
    },

    socketMsg: function(msg) {
        AppDispatcher.handleAction(({
            actionType: appConstants.SOCKET_MSG,
            data: msg
        }))
    }
};

module.exports = sampleActions;