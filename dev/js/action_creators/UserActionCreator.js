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
  signUp: (data) => {
    UserAPIUtils.signUp(data);
  },
  signUpSuccess: (id, token) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.USER.SIGN_UP.SUCCESS_RESPONSE,
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
  }
};

