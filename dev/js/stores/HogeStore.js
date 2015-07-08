var AppDispatcher = require('../dispatcher/Dispatcher'),
    Constants = require('../constants/Constants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign')
;

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var HogeStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

HogeStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.Hoge:
      HogeStore.emitChange();
      break;
  }
});


module.exports = HogeStore;
