import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

import BoardAPIUtils from '../utils/BoardAPIUtils';

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';
var SELECT_EVENT = 'index';

var _boards = {};
var _boardsLoading = true;
var _currentBoard = {};

class BoardStore extends EventEmitter {
  constructor() {
    super();
  }

  emitChange(eventName) {
    this.emit(eventName);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  //ボード選択のみのイベントリスナ
  addSelectListener(callback) {
    this.on(SELECT_EVENT, callback);
  }

  removeSelectListener(callback) {
    this.removeListener(SELECT_EVENT, callback);
  }

  getBoards() {
    return _boards;
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
      _boardsLoading = false;
      _boards = {};
      action.boards.map((board) => {
        _boards[board.id] = board;
      });
      if(Object.keys(_boards).length != 0) {
        _currentBoard = _boards[(Object.keys(_boards))[0]];
        _BoardStore.emitChange(SELECT_EVENT);
      }
      _BoardStore.emitChange(CHANGE_EVENT);
      break;
    case ActionTypes.BOARDS.CREATE.SUCCESS_RESPONSE:
      _boards[action.board.id] = action.board;
      if(Object.keys(_currentBoard).length == 0) {
        _currentBoard = action.board;
        _BoardStore.emitChange(SELECT_EVENT);
      }
      _BoardStore.emitChange(CHANGE_EVENT);
      break;
    case ActionTypes.BOARDS.UPDATE.SUCCESS_RESPONSE:
      _boards[action.board.id] = action.board;
      _BoardStore.emitChange(CHANGE_EVENT);
      break;
    case ActionTypes.BOARDS.DELETE.SUCCESS_RESPONSE:
      delete _boards[action.id];
      if(Object.keys(_boards).length != 0) {
        _currentBoard = _boards[(Object.keys(_boards))[0]];
        _BoardStore.emitChange(SELECT_EVENT);
      }else {
        _currentBoard = {};
      }
      _BoardStore.emitChange(CHANGE_EVENT);
      break;
    case ActionTypes.BOARDS.CHANGE_CURRENT:
      _currentBoard = _boards[action.boardId];
      _BoardStore.emitChange(SELECT_EVENT);
      _BoardStore.emitChange(CHANGE_EVENT);
      break;
  }
});
