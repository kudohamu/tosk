import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

import BoardAPIUtils from '../utils/BoardAPIUtils';

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var boards = [];
var _boardsLoading = true;
var _currentBoard = 0;

class BoardStore extends EventEmitter {
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

  getBoards() {
    return boards;
  }

  getBoardsLoading() {
    return _boardsLoading;
  }

  getCurrentBoard() {
    return _currentBoard;
  }
}

let _BoardStore = new BoardStore();

export default _BoardStore;

AppDispatcher.register((payload) => {
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.BOARDS.INDEX.SUCCESS_RESPONSE:
    case ActionTypes.BOARDS.CREATE.SUCCESS_RESPONSE:
      _boardsLoading = false;
      boards = action.data;
      if(_currentBoard == 0 && boards.length != 0) {
        _currentBoard = boards[0].id;
      }
      _BoardStore.emitChange();
      break;
    case ActionTypes.BOARDS.DELETE.SUCCESS_RESPONSE:
      boards = action.data;
      if(boards.length != 0) {
        _currentBoard = boards[0].id;
      }else {
        _currentBoard = 0;
      }
      _BoardStore.emitChange();
      break;
    case ActionTypes.BOARDS.CHANGE_CURRENT:
      _currentBoard = action.boardId;
      _BoardStore.emitChange();
      break;
  }
});
