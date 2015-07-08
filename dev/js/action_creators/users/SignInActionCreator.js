import Constants from '../../constants/Constants';
import AppDispatcher from '../../dispatcher/Dispatcher';

export default {
  signIn: (data, actionType) => {
    AppDispatcher.handleViewAction({
      type: actionType,
      data: data
    });
  },
  signInSuccess: (id, token) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.USER.SIGN_IN.SUCCESS_RESPONSE,
      id: id,
      token: token,
    });
  },
  signInErr: (errMsg) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.USER.SIGN_IN.ERROR_RESPONSE,
      errMsg: errMsg
    });
  }
};

