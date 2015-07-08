import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import SignInActionCreator from '../action_creators/users/SignInActionCreator';
import APIUtils from './APIUtils';

export default {
  signUp: (user) => {
    request
      .post(`${Constants.RootUrl.SERVER}/user`)
      .send({
        user: user
      })
      .end((err, res) => {
        if (err != null) {
          //TODO 500または404ページに飛ばす
          console.log(err);
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
          SignInActionCreator.signInSuccess(res["body"]["id"], res["body"]["token"]);
          location.href = "/#/account/dashboard/actives";
        }else {
          SignInActionCreator.signInErr(res["body"]["msg"]);
        }
      }
    );
  }
}
