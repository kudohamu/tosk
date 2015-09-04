import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

import UserAPIUtils from '../utils/UserAPIUtils';

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
  signOut: () => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.USER.SIGN_OUT,
    })
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
  },
};

