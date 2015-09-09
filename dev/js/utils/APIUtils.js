import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

import NotificationActionCreator from '../action_creators/NotificationActionCreator';
import UserActionCreator from '../action_creators/UserActionCreator';
import APIUtils from './APIUtils';
import UserStore from '../stores/UserStore';

export default {
  get: (url, success) => {
    request
      .get(`${Constants.RootUrl.SERVER}/${url}`)
      .end((err, res) => {
        if(err == null) {
          success(res);
        }else {
          APIUtils.errorAction(res);
        }
      }
    );
  },

  authGet: (url, success) => {
    let authData = UserStore.getAuthData();
    console.log("auth:" + authData.id);
    request
      .get(`${Constants.RootUrl.SERVER}/${url}`)
      .set('Authorization', `${authData.id}:${authData.token}`)
      .end((err, res) => {
        if(err == null) {
          success(res);
        }else {
          APIUtils.errorAction(res);
        }
      }
    );
  },

  post: (url, params, success) => {
    request
      .post(`${Constants.RootUrl.SERVER}/${url}`)
      .send(params)
      .end((err, res) => {
        if(err == null) {
          success(res);
        }else {
          APIUtils.errorAction(res);
        }
      }
    );
  },

  authPost: (url, params, success) => {
    let authData = UserStore.getAuthData();
    console.log("auth:" + authData.id);
    request
      .post(`${Constants.RootUrl.SERVER}/${url}`)
      .send(params)
      .set('Authorization', `${authData.id}:${authData.token}`)
      .end((err, res) => {
        if(err == null) {
          success(res);
        }else {
          APIUtils.errorAction(res);
        }
      }
    );
  },

  authDelete: (url, params, success) => {
    let authData = UserStore.getAuthData();
    request
      .del(`${Constants.RootUrl.SERVER}/${url}`)
      .send(params)
      .set('Authorization', `${authData.id}:${authData.token}`)
      .end((err, res) => {
        if(err == null) {
          success(res);
        }else {
          APIUtils.errorAction(res);
        }
      }
    );
  },

  authPut: (url, params, success) => {
    let authData = UserStore.getAuthData();
    request
      .put(`${Constants.RootUrl.SERVER}/${url}`)
      .send(params)
      .set('Authorization', `${authData.id}:${authData.token}`)
      .end((err, res) => {
        if(err == null) {
          success(res);
        }else {
          APIUtils.errorAction(res);
        }
      }
    );
  },

  errorAction: (res) => {
    switch (res.status) {
      case 400:
      case 422:
        NotificationActionCreator.pushError('不正なデータです。');
        break;
      case 401:
        NotificationActionCreator.pushError('メールアドレスかパスワードが違います。');
        break;
      case 403:
        NotificationActionCreator.pushError('認証に失敗しました。再度ログインしてください。');
        UserActionCreator.signOut();
        break;
      case 500:
        NotificationActionCreator.pushError('サーバでエラーが発生しました。一定期間置いてから再度ログインしてください。');
        UserActionCreator.signOut();
        break;
      default:
        console.info(res);
        NotificationActionCreator.pushError('予期しないエラーが発生しました。一定期間置いてから再度ログインしてください。');
        UserActionCreator.signOut();
        break;
    };
  },
}
