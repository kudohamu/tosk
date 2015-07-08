import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import SignUpActionCreator from '../action_creators/users/SignUpActionCreator';

export default {
  submit: (user) => {
    request
      .post(Constants.RootUrl.SERVER + 'user')
      .send({
        user: user
      })
      .end((err, res) => {
        if (err != null) {
        }else {
          if (res["body"]["result"] == "ok") {
            location.href = "/#/user/todoboard";
            SignUpActionCreator.signUpSuccess(res["body"]["id"], res["body"]["token"]);
          }else {
            SignUpActionCreator.signUpErr(res["body"]["msg"]);
          }
        }
      }
    );
  }
}
