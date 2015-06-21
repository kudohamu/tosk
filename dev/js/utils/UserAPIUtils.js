var request = require('superagent'),
    Constants = require('../constants/Constants'),
    AppDispatcher = require('../dispatcher/Dispatcher'),
    SignUpActionCreator = require('../action_creators/users/SignUpActionCreator')
;

module.exports = {
  submit: function(user) {
    request
      .post(Constants.RootUrl.SERVER + 'user')
      .send({
        user: user
      })
      .end(function(err, res) {
        if (err != null) {
        }else {
          if (res["result"] == "ok") {
          }else {
            SignUpActionCreator.signUpErr(res["body"]["msg"]);
          }
        }
      }.bind(this)
    );
  }
};
