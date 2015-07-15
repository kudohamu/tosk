import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

import BoardAPIUtils from '../utils/BoardAPIUtils';

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var boards = [];

class BoardStore extends EventEmitter {
  constructor() {
    super();
    BoardAPIUtils.index(1);
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

  getBoards() {
    return boards;
  }
}

let _BoardStore = new BoardStore();

export default _BoardStore;

AppDispatcher.register((payload) => {
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.BOARDS.INDEX.SUCCESS_RESPONSE:
      boards = action.data;
      _BoardStore.emitChange();
      break;
  }
});