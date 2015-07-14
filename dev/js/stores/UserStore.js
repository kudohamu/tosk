import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

let ActionTypes = Constants.ActionTypes;
let CHANGE_EVENT = 'change';

let account = {
  id: '',
  token: '',
  icon: {
    value: '',
    errMsg: '',
    bsStyle: ''
  },
  name: {
    value: '',
    errMsg: '',
    bsStyle: '',
    validation: function() {
      var reg = /^[0-9a-zA-Z_@\-]{4,30}$/;
      if (reg.test(this.value)) {
        this.errMsg = "";
        this.bsStyle = "success";
      }else {
        this.errMsg = "使用可能文字: 英数字, @, _(4文字以上30文字以内)";
        this.bsStyle = "error";
      }
    }
  },
  mail: {
    value: '',
    errMsg: '',
    bsStyle: '',
    validation: function() {
      var reg = /^([\w\-\+_]+\.?[\w\-\+_]+)+@([a-z0-9\-]+\.[a-z]+)+$/;
      if (reg.test(this.value)) {
        this.errMsg = "";
        this.bsStyle = "success";
      }else {
        this.errMsg = "不正なメールアドレスです";
        this.bsStyle = "error";
      }
    }
  },
  password: {
    value: '',
    errMsg: '',
    bsStyle: '',
    validation: function() {
      var reg = /^[0-9a-zA-Z]+$/;
      if(this.value.length < 8) {
        this.errMsg = "パスワードは8文字以上";
        this.bsStyle = "error";
      }else if(reg.test(this.value)) {
        this.errMsg = "";
        this.bsStyle = "warning";
      }else {
        this.errMsg = "";
        this.bsStyle = "success";
      }
    }
  },
  password_confirmation: {
    value: '',
    errMsg: '',
    bsStyle: '',
    validation: function() {
      if (this.value == account.password.value) {
        this.errMsg = "";
        this.bsStyle = "success";
      }else {
        this.errMsg = "一致しません";
        this.bsStyle = "error";
      }
    }
  },
};

var errMsg = '';

class UserStore extends EventEmitter {
  constructor() {
    super();
    let cookies = (() =>{
      return document.cookie.split('; ').map((cookie) => {
        let kv = cookie.split('=');
        var obj = {};
        obj[kv[0]] = kv[1]; //仕様が...
        return obj;
      }).concat();
    })();
    account.id = cookies[0].id;
    account.token = cookies[1].token;
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
}

let _UserStore = new UserStore();

export default _UserStore;

AppDispatcher.register((payload) => {
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.USER.SIGN_UP.CHANGE_ICON:
      var files = action.data;
      if(files.length == 0) {
        account.icon.value = "";
        account.icon.errMsg = "";
        account.icon.bsStyle = "";
      }else {
        var file = files[0];
        if (file.size <= 70000) {
          var reader = new FileReader();
          reader.onload = function(upload) {
            account.icon.value = upload.target.result;
            var filetype = upload.target.result.split("data:")[1].split(";")[0];
            if (/^image\/.+$/.test(filetype)) {
              if (/^image\/(png|jpg|jpeg)$/.test(filetype)) {
                account.icon.errMsg = "";
                account.icon.bsStyle = "success";
              }else {
                account.icon.errMsg = "拡張子が不正です";
                account.icon.bsStyle = "";
              }
            }else {
              account.icon.errMsg = "画像ファイルではありません";
              account.icon.bsStyle = "";
            }
            _UserStore.emitChange();
          };
          reader.readAsDataURL(file);
        }else {
          account.icon.value = "";
          account.icon.bsStyle = "";
          account.icon.errMsg = "7M以上のファイルです";
        }
      }
      break;
    case ActionTypes.USER.SIGN_UP.CHANGE_NAME:
      account.name.value = action.data;
      account.name.validation();
      break;
    case ActionTypes.USER.SIGN_UP.CHANGE_MAIL:
      account.mail.value = action.data;
      account.mail.validation();
      break;
    case ActionTypes.USER.SIGN_UP.CHANGE_PASSWORD:
      account.password.value = action.data;
      account.password.validation();
      account.password_confirmation.validation();
      break;
    case ActionTypes.USER.SIGN_UP.CHANGE_PASSWORD_CONFIRMATION:
      account.password_confirmation.value = action.data;
      account.password_confirmation.validation();
      break;
    case ActionTypes.USER.SIGN_UP.SUCCESS_RESPONSE:
      id = action.id;
      token = action.token;
      break;
    case ActionTypes.USER.SIGN_UP.ERROR_RESPONSE:
      errMsg = action.errMsg;
      break;
    case ActionTypes.USER.SIGN_IN.SUCCESS_RESPONSE:
      account.id = action.id;
      account.token = action.token;
      break;
    case ActionTypes.USER.SIGN_IN.ERROR_RESPONSE:
      errMsg = action.errMsg;
      break;
  }
  _UserStore.emitChange();
});
