import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

export default {
  authAgent:(url, params, success) => {
    request
      .post(`Constants.RootUrl.SERVER${url}`)
      .send(params)
      .set('Authorization', 'id:auth')
      .end((err, res) => {
        if(err == null) {
          success(res);
        }else {
          console.log(err);
        }
      }
    );
  }
}
