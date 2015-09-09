import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var page = Constants.PAGE.LOADING;

class PageStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getPage() {
    return page;
  }
}

let _PageStore = new PageStore();

export default _PageStore;

AppDispatcher.register((payload) => {
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.PAGE.CHANGE:
      page = action.page;
      _PageStore.emitChange();
      break;
  }
});
