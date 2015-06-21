var Constants = require('../constants/Constants'),
    AppDispatcher = require('../dispatcher/Dispatcher')
;

module.exports = {
  hoge: function(content) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.HOGE,
      content: content
    });
  }
};
