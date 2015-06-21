var Constants = require('../../constants/Constants'),
    AppDispatcher = require('../../dispatcher/Dispatcher')
;

module.exports = {
  changeInput: function(data, actionType) {
    AppDispatcher.handleViewAction({
      type: actionType,
      data: data
    });
  },
  signUpErr: function(errMsg) {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.USER.SIGN_UP.ERROR_RESPONSE,
      errMsg: errMsg
    });
  },
};
