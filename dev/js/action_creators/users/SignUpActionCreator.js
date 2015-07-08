import Constants from '../../constants/Constants';
import AppDispatcher from '../../dispatcher/Dispatcher';

export default {
  changeInput: (data, actionType) => {
    AppDispatcher.handleViewAction({
      type: actionType,
      data: data
    });
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
  }
};

