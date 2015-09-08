import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import FormStyle from '../styles/form';

import Constants from '../constants/Constants';
import UserStore from '../stores/UserStore';
import UserActionCreator from '../action_creators/UserActionCreator';
import PageActionCreator from '../action_creators/PageActionCreator';

import { Button, Input } from 'react-bootstrap';

import AlertBox from './components/AlertBox';

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
    cursor:'pointer',
  },
  autoLoginCheckbox: {
  }
});

class Top extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoLogin: false,
      authData: {},
      errMsg: '',
      alertVisible: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleAlertDismiss = this._handleAlertDismiss.bind(this);
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      errMsg: UserStore.getErrMsg(),
      authData: UserStore.getAuthData(),
    });

    if (this.state.errMsg != '') {
      this.setState({ alertVisible: true });
    }else {
      this.setState({ alertVisible: false });
    }

    let checkAutoLogin = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.state.authData);
        }, 500);
      });
    }

    checkAutoLogin().then((authData) => {
      if(authData.id && authData.token) {
        PageActionCreator.setPage(Constants.PAGE.DASHBOARD);
      }
    });
  }

  _handleSubmit() {
    let mail = React.findDOMNode(this.refs.mail).value;
    let password = React.findDOMNode(this.refs.password).value;
    UserActionCreator.signIn(mail, password, this.state.autoLogin);
  }

  _handleAlertDismiss() {
    this.setState({ alertVisible: false });
  }

  render() {
    return (
      <div className='top' style={styles.top}>
        <AlertBox msg={this.state.errMsg} alertVisible={this.state.alertVisible} handleAlertDismiss={this._handleAlertDismiss} />
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
            <a style={styles.createAccountLink} onClick={(() => {PageActionCreator.setPage(Constants.PAGE.SIGN_UP)})}>アカウントを作成</a>
          </div>
        </div>
        <div style={styles.padding}></div>
      </div>
    );
  }
}

ReactMixin(Top.prototype, React.addons.LinkedStateMixin);

export default Radium(Top);
