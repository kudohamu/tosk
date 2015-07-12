import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import UserStore from '../stores/UserStore';

export default {
  post: (url, params, success) => {
    request
      .post(`${Constants.RootUrl.SERVER}/${url}`)
      .send(params)
      .end((err, res) => {
        if(err == null) {
          success(res);
        }else {
          console.log(err);
          //TODO 500または404ページに飛ばす
        }
      }
    );
  },

  authPost: (url, params, success) => {
    let authData = UserStore.getAuthData();
    console.log("auth:" + authData.id);
    request
      .post(`${Constants.RootUrl.SERVER}/${url}`)
      .send(params)
      .set('Authorization', `${authData.id}:${authData.token}`)
      .end((err, res) => {
        if(err == null) {
          success(res);
        }else {
          console.log(err);
          //TODO 500または404ページに飛ばす
        }
      }
    );
  }
}
