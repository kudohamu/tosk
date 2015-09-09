import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

let ActionTypes = Constants.ActionTypes;
let CHANGE_EVENT = 'change';

let account = {
  id: '',
  token: '',
  icon: '',
  name: '',
  mail: '',
  password: '',
  password_confirmation: '',
};

var errMsg = '';
var signUpSuccess = false;

class UserStore extends EventEmitter {
  constructor() {
    super();
    let cookies = (() =>{
      var obj = {};
      for (let cookie of document.cookie.split('; ')) {
        let kv = cookie.split('=');
        obj[kv[0]] = kv[1];
      }
      return obj;
    })();
    if('id' in cookies) {
      account.id = cookies['id'];
    }
    if('token' in cookies) {
      account.token = cookies['token'];
    }
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

  getAccountData() {
    return account;
  }

  getErrMsg() {
    return errMsg;
  }

  getAuthData() {
    return { id: account.id, token: account.token };
  }

  deleteAuthData() {
    document.cookie = `id=; expires=Thu, 01 Jan 1970 00:00:00 GMT`; 
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 GMT`; 
  }

  getSignUpSuccess() {
    return signUpSuccess;
  }
}

let _UserStore = new UserStore();

export default _UserStore;

AppDispatcher.register((payload) => {
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.USER.SHOW.SUCCESS_RESPONSE:
      account.icon = action.user.icon;
      account.name = action.user.name;
      account.mail = action.user.mail;
      break;
    case ActionTypes.USER.UPDATE.SUCCESS_RESPONSE:
      account.icon = action.user.icon;
      account.name = action.user.name;
      account.mail = action.user.mail;
      break;
    case ActionTypes.USER.CHANGE_ICON:
      var files = action.data;
      //account.icon.value = files[0];
      //account.icon.validation();
      break;
    case ActionTypes.USER.CHANGE_NAME:
      account.name = action.data;
      break;
    case ActionTypes.USER.CHANGE_MAIL:
      account.mail = action.data;
      break;
    case ActionTypes.USER.CHANGE_PASSWORD:
      account.password = action.data;
      break;
    case ActionTypes.USER.CHANGE_PASSWORD_CONFIRMATION:
      account.password_confirmation = action.data;
      break;
    case ActionTypes.USER.CREATE.SUCCESS_RESPONSE:
      account.id = action.id;
      account.token = action.token;
      signUpSuccess = true;
      break;
    case ActionTypes.USER.CREATE.ERROR_RESPONSE:
      errMsg = action.errMsg;
      break;
    case ActionTypes.USER.SIGN_IN.SUCCESS_RESPONSE:
      account.id = action.id;
      account.token = action.token;
      break;
    case ActionTypes.USER.SIGN_IN.ERROR_RESPONSE:
      errMsg = action.errMsg;
      break;
    case ActionTypes.USER.SIGN_OUT:
      account.id = '';
      account.token = '';
      _UserStore.deleteAuthData();
      break;
  }
  _UserStore.emitChange();
});
