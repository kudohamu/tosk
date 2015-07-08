import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

export default HogeAPIUtils = {
  hoge: (param) => {
    request
      .post(Constants.RootUrl.SERVER + 'hoge')
      .send({
        param: param
      })
      .end((err, res) => {
        console.log(err);
        console.log(res);
      }
    );
  }
}
