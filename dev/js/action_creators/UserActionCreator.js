import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

import UserAPIUtils from '../utils/UserAPIUtils';
import NotificationActionCreator from './NotificationActionCreator';

export default {
  changeInput: (data, actionType) => {
    AppDispatcher.handleViewAction({
      type: actionType,
      data: data
    });
  },
  create: (user) => {
    UserAPIUtils.create(user);
  },
  createSuccess: (id, token) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.USER.CREATE.SUCCESS_RESPONSE,
      id: id,
      token: token,
    });
  },
  signUpErr: (errMsg) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.USER.SIGN_UP.ERROR_RESPONSE,
      errMsg: errMsg
    });
  },

  signIn: (mail, password, autoLogin) => {
    UserAPIUtils.signIn(mail, password, autoLogin);
  },

  signInSuccess: (id, token) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.USER.SIGN_IN.SUCCESS_RESPONSE,
      id: id,
      token: token,
    });
    NotificationActionCreator.pushSuccess('サインインしました。');
  },

  signOut: () => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.USER.SIGN_OUT,
    });
    NotificationActionCreator.pushSuccess('サインアウトしました。');
  },

  show: () => {
    UserAPIUtils.show();
  },

  showSuccess: (user) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.USER.SHOW.SUCCESS_RESPONSE,
      user: user,
    });
  },

  update: (user) => {
    UserAPIUtils.update(user);
  },

  updateSuccess: (user) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.USER.UPDATE.SUCCESS_RESPONSE,
      user: user,
    });
    NotificationActionCreator.pushSuccess('プロフィールを更新しました。');
  },
};

