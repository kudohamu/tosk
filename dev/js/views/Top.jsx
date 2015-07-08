import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import FormStyle from '../styles/form';
import { Button } from 'react-bootstrap';

var styles = Vendor.prefix({
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

class Top extends React.Component {
  render() {
    return (
      <div className="top" style={styles.top}>
        <div style={styles.padding}></div>
        <div style={styles.formContainer}>
          <div className="form" style={FormStyle.container}>
            <div className="form-group">
              <label className="sr-only" htmlFor="mail">Mail Address</label>
              <input type="text" className="form-control input-lg" placeholder="mail" />
            </div>
            <div className="form-group">
              <label className="sr-only" htmlFor="password">Password</label>
              <input type="password" className="form-control input-lg" placeholder="password" />
            </div>
            <Button bsStyle="success" style={styles.submit}>ログイン</Button>
            <a href="/#/user/sign_up">アカウントを作成</a>
            <br />
            <br />
            <br />
            <a href="" style={styles.twitter}><img src="../images/twitter_button.png" style={styles.twitter_icon} /></a>
          </div>
        </div>
        <div style={styles.padding}></div>
      </div>
    );
  }
}

export default Radium(Top);
