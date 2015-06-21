var Dispatcher = require('flux').Dispatcher,
    Constants = require('../constants/Constants'),
    assign = require('object-assign')
;

var PayloadSources = Constants.PayloadSources;

var AppDispatcher = assign(new Dispatcher(), {
  handleServerAction: function(action) {
    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action: action
    })
  },

  handleViewAction: function(action) {
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action
    })
  }
});

module.exports = AppDispatcher;
