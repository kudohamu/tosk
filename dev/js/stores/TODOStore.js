import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';
    //assign = require('object-assign')
;

let ActionTypes = Constants.ActionTypes;
let CHANGE_EVENT = 'change';

var sampleTODO = {
  id: 1,
  content: 'Webアプリ作成',
  checked: false,
  children: [
    {
      id: 12,
      content: 'デザイン決め',
      checked: false,
      children: [],
    },
    {
      id: 2,
      content: 'モデル設計',
      checked: true,
      children: [],
    },
    {
      id: 3,
      content: 'API設計',
      checked: false,
      open:false,
      children: [
        {
          id: 11,
          content: 'huga',
          checked: false,
          children: [],
        }
      ],
    },
    {
      id: 4,
      content: 'モデル作成',
      checked: false,
      open:false,
      children: [
        {
          id: 6,
          content: 'モデル生成',
          checked: false,
          children: [],
        },
        {
          id: 7,
          content: 'テスト作成',
          checked: false,
          children: [],
        },
        {
          id: 8,
          content: 'マイグレーション作成',
          checked: false,
          open:false,
          children: [
            {
              id: 10,
              content: 'hoge',
              checked: false,
              children: [],
            }
          ],
        },
        {
          id: 9,
          content: 'バリデーション作成',
          checked: false,
          children: [],
        }
      ]
    },
    {
      id: 5,
      content: 'コントローラ作成',
      checked: false,
      children: [],
    }
  ]
}

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
    case ActionTypes.TODOS.INDEX.SUCCESS_RESPONSE:
      action.todos.map((todo) => {
        _todos[todo.id] = todo;
      });
      _TODOStore.emitChange();
      break;
    case ActionTypes.TODOS.CREATE.SUCCESS_RESPONSE:
      _todos[action.todo.id] = action.todo;
      _TODOStore.emitChange();
      break;
    case ActionTypes.TODOS.DELETE.SUCCESS_RESPONSE:
      delete _todos[action.id];
      _TODOStore.emitChange();
      break;
  }
});

