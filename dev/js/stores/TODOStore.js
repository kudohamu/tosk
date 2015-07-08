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

let todos = [sampleTODO];

export default class TODOStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListenern(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
                        
  getTODO(id) {
    return todos[id];
  }
}

let _TODOStore = new TODOStore();

export default _TODOStore;

AppDispatcher.register((payload) => {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.Hoge:
      _TODOStore.emitChange();
      break;
  }
});

