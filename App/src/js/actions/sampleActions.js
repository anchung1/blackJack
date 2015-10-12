var AppDispatcher = require('../dispatcher/AppDispatcher');
var appConstants = require('../constants/appConstants');

var sampleActions = {
    anAction: function(item){
        AppDispatcher.handleAction({
            actionType: appConstants.SAMPLE_ITEM,
            data: item
        });
    }
};

module.exports = sampleActions;