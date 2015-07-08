import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import FormStyle from '../styles/form';
import { Button, Input } from 'react-bootstrap';

var styles = Vendor.prefix({
  top: {
    display:'table',
    height:'100%',
    width:'100%',
  },
  padding: {
    display:'table-cell',
    width:'33%'
  },
  formContainer: {
    display:'table-cell',
    verticalAlign:'middle',
  },
  submit: {
    display:'block',
    margin:'0 auto',
  },
  twitter: {
    display:'block',
    padding:'0',
    margin:'0 auto',
    width:'228px',
  },
  twitter_icon: {
    height:'50px'
  },
  createAccountLink: {
    color:'black',
  },
  autoLoginCheckbox: {
  }
});

class Top extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoLogin: false,
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit() {
    console.log(React.findDOMNode(this.refs.mail).value);
    console.log(React.findDOMNode(this.refs.password).value);
    console.log(this.state.autoLogin);
  }

  render() {
    return (
      <div className='top' style={styles.top}>
        <div style={styles.padding}></div>
        <div style={styles.formContainer}>
          <div className='form' style={FormStyle.container}>
            <div className='form-group'>
              <label className='sr-only' htmlFor='mail'>Mail Address</label>
              <input type='text' className='form-control input' placeholder='mail' ref='mail' />
            </div>
            <div className='form-group'>
              <label className='sr-only' htmlFor='password'>Password</label>
              <input type='password' className='form-control input-' placeholder='password' ref='password' />
            </div>
            <Input type='checkbox' label='次回から自動でログインする' style={styles.autoLoginCheckbox} checkedLink={this.linkState('autoLogin')} />
            <Button bsStyle='success' style={styles.submit} onClick={this._handleSubmit}>ログイン</Button>
            <a href='/#/user/sign_up' style={styles.createAccountLink}>アカウントを作成</a>
            <br />
            <br />
            <br />
            <a href='' style={styles.twitter}><img src='../images/twitter_button.png' style={styles.twitter_icon} /></a>
          </div>
        </div>
        <div style={styles.padding}></div>
      </div>
    );
  }
}

ReactMixin(Top.prototype, React.addons.LinkedStateMixin);

export default Radium(Top);
