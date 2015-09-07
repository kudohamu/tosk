import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';


const ActionTypes = Constants.ActionTypes;
const CHANGE_EVENT = 'change';

var _frontPane = true
var _notification = { content: '', frontPane: _frontPane };
var _auto_erasing_id = '';

class NotificationStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getNotification() {
    return _notification;
  }
}

let _NotificationStore = new NotificationStore();

export default _NotificationStore;

AppDispatcher.register((payload) => {
  const action = payload.action;

  switch(action.type) {
    case ActionTypes.NOTIFICATIONS.PUSH:
      _frontPane = !(_frontPane);
      _notification = { content: action.content, frontPane: _frontPane, category: action.category };

      //前の通知の自動削除をキャンセル
      if (_auto_erasing_id != '') {
        clearTimeout(_auto_erasing_id);
      }

      _NotificationStore.emitChange();
      break;
    case ActionTypes.NOTIFICATIONS.ERASE:
      //キャンセルされていなければ自動削除をキャンセル
      if (_auto_erasing_id != '') {
        clearTimeout(_auto_erasing_id);
      }
      _notification.content = '';
      _auto_erasing_id = '';
      _NotificationStore.emitChange();
      break;
    case ActionTypes.NOTIFICATIONS.SET_AUTO_ERASING:
      _auto_erasing_id = action.id;
      _NotificationStore.emitChange();
      break;
  }
});
