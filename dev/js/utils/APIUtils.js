import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

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
    request
      .post(`${Constants.RootUrl.SERVER}/${url}`)
      .send(params)
      .set('Authorization', 'id:auth')
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
