var AppDispatcher = require('../dispatcher/Dispatcher'),
    Constants = require('../constants/Constants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign')
;

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var account = {
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

var UserStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getAccountData: function() {
    return account;
  },
  getErrMsg: function() {
    return errMsg;
  }
});

UserStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.USER.SIGN_UP.SUBMIT:
      break;
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
            UserStore.emitChange();
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
    case ActionTypes.USER.SIGN_UP.ERROR_RESPONSE:
      errMsg = action.errMsg;
      break;
  }
  UserStore.emitChange();
});

module.exports = UserStore;
