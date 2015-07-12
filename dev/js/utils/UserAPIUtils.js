import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import SignInActionCreator from '../action_creators/users/SignInActionCreator';
import SignUpActionCreator from '../action_creators/users/SignUpActionCreator';
import APIUtils from './APIUtils';

export default {
  signUp: (user) => {
    APIUtils.post(
      'user',
      {
        user: user
      },
      (res) => {
        if (res["body"]["result"] == "ok") {
          SignUpActionCreator.signUpSuccess(res["body"]["id"], res["body"]["token"]);
          location.href = "/#/account/dashboard/actives";
        }else {
          SignUpActionCreator.signUpErr(res["body"]["msg"]);
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
