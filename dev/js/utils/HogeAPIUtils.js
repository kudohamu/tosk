var request = require('superagent'),
    Constants = require('../constants/Constants'),
    AppDispatcher = require('../dispatcher/Dispatcher')
;

module.exports = {
  hoge: function(param) {
    request
      .post(Constants.RootUrl.SERVER + 'hoge')
      .send({
        param: param
      })
      .end(function(err, res) {
        console.log(err);
        console.log(res);
      }.bind(this)
    );
  }
};
