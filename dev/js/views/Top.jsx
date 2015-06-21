var React = require('react/addons'),
    Vendor = require('react-vendor-prefix'),
    Styler = require('../styler'),
    Button = require('react-bootstrap').Button
;

var style = Vendor.prefix({
  top: {
    display:"table",
    height:"100%",
    width:"100%",
  },
  padding: {
    display:"table-cell",
    width:"33%"
  },
  formContainer: {
    display:"table-cell",
    verticalAlign:"middle",
  },
  submit: {
    display:"block",
    margin:"0 auto",
  },
  twitter: {
    display:"block",
    padding:"0",
    margin:"0 auto",
    width:"228px",
  },
  twitter_icon: {
    height:"50px"
  }
});

var Top = React.createClass({
  render() {
    return (
      <div className="top" style={style.top}>
        <div style={style.padding}></div>
        <div style={style.formContainer}>
          <div className="form" style={Styler.form}>
            <div className="form-group">
              <label className="sr-only" htmlFor="mail">Mail Address</label>
              <input type="text" className="form-control input-lg" placeholder="mail" />
            </div>
            <div className="form-group">
              <label className="sr-only" htmlFor="password">Password</label>
              <input type="password" className="form-control input-lg" placeholder="password" />
            </div>
            <Button bsStyle="success" style={style.submit}>ログイン</Button>
            <a href="/#/user/sign_up">アカウントを作成</a>
            <br />
            <br />
            <br />
            <a href="" style={style.twitter}><img src="../images/twitter_button.png" style={style.twitter_icon} /></a>
          </div>
        </div>
        <div style={style.padding}></div>
      </div>
    );
  }
});

module.exports = Top;
