import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';
    //assign = require('object-assign')
;

let ActionTypes = Constants.ActionTypes;
let CHANGE_EVENT = 'change';

var _todos = {};

export default class TODOStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  
  getTODOs() {
    return _todos;
  }

  getTODO(id) {
    return _todos[id];
  }
}

let _TODOStore = new TODOStore();

export default _TODOStore;

AppDispatcher.register((payload) => {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.TODOS.CLEAR:
      _todos = {};
      _TODOStore.emitChange();
      break;
    case ActionTypes.TODOS.INDEX.SUCCESS_RESPONSE:
      _todos = {};
      action.todos.map((todo) => {
        _todos[todo.id] = todo;
      });
      _TODOStore.emitChange();
      break;
    case ActionTypes.TODOS.CREATE.SUCCESS_RESPONSE:
    case ActionTypes.TODOS.OPEN_FOLDER:
      _todos[action.todo.id] = action.todo;
      _TODOStore.emitChange();
      break;
    case ActionTypes.TODOS.DELETE.SUCCESS_RESPONSE:
      delete _todos[action.id];
      _TODOStore.emitChange();
      break;
    case ActionTypes.TODOS.CHANGE.SUCCESS_RESPONSE:
      _todos[action.todo.id] = action.todo;
      _TODOStore.emitChange();
      break;
  }
});

