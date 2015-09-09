import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

import NotificationActionCreator from '../action_creators/NotificationActionCreator';
import UserActionCreator from '../action_creators/UserActionCreator';
import PageActionCreator from '../action_creators/PageActionCreator';
import APIUtils from './APIUtils';
import UserStore from '../stores/UserStore';

export default {
  create: (user) => {
    APIUtils.post(
      'user',
      {
        user: user
      },
      (res) => {
        if (res["body"]["result"] == "ok") {
          UserActionCreator.createSuccess(res["body"]["id"], res["body"]["token"]);
          PageActionCreator.setPage(Constants.PAGE.DASHBOARD);
        }else {
        }
      }
    );
  },

  signIn: (mail, password, autoLogin) => {
    APIUtils.post(
      'user/login', 
      {
        mail: mail,
        password: password
      }, 
      (res) => {
        if(res["body"]["result"] == "ok") {
          if(autoLogin) {
            document.cookie = `id=${encodeURIComponent(res["body"]["id"])}`;
            document.cookie = `token=${encodeURIComponent(res["body"]["token"])}`;
          }
          UserActionCreator.signInSuccess(res["body"]["id"], res["body"]["token"]);
          PageActionCreator.setPage(Constants.PAGE.DASHBOARD);
        }else {
          NotificationActionCreator.pushError('メールアドレスかパスワードが違います。');
        }
      }
    );
  },

  show: () => {
    APIUtils.authGet(
      'user',
      (res) => {
        if (res['body']['result'] == 'ok') {
          UserActionCreator.showSuccess(res['body']['user']);
        }else {
        }
      }
    );
  },

  update: (user) => {
    APIUtils.authPut(
      'user',
      {
        user: user
      },
      (res) => {
        if (res['body']['result'] == 'ok') {
          UserActionCreator.updateSuccess(res['body']['user']);
        }
      }
    );
  }
}
