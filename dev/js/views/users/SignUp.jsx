import React from 'react/addons';
import ReactMixin from 'react-mixin';
import DeepLinkedState from 'react-deep-link-state';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import FormStyle from '../../styles/form';
import UserStore from '../../stores/UserStore';
import SignUpActionCreator from '../../action_creators/users/SignUpActionCreator';
import UserAPIUtils from '../../utils/UserAPIUtils';
import Constants from '../../constants/Constants';

import { Button, ButtonInput, Input } from 'react-bootstrap';
import AlertBox from '../components/AlertBox';

var styles = Vendor.prefix({
  SignUp: {
    display:"table",
    height:"100%",
    width:"100%",
    tableLayout:"fixed"
  },
  padding: {
    display:"table-cell",
    width:"33%"
  },
  formContainer: {
    display:"table-cell",
    verticalAlign:"middle",
    width:"410px",
  },
  icon: {
    border:"solid 1px #a1a1a1",
    width:"120px",
    height:"120px",
    marginBottom:"10px",
  },
  input: {
    position:"relative",
  },
  submit: {
    display:"block",
    margin:"0 auto",
    disabled: "true"
  },
  popver: {
    position:"absolute"
  },
  errSpan: {
    color:"#a84f50",
    position:"relative",
    top:"-10px"
  },
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserStore.getAccountData(),
      disabled: "disabled",
      errMsg: "",
      alertVisible: false
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  }

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({ 
      user: UserStore.getAccountData(),
      errMsg: UserStore.getErrMsg()
    });

    if (this.state.errMsg != '') {
      this.setState({ alertVisible: true });
    }else {
      this.setState({ alertVisible: false });
    }

    if (this.state.user.icon.bsStyle == "success" && 
        this.state.user.name.bsStyle == "success" && 
        this.state.user.mail.bsStyle == "success" && 
        (this.state.user.password.bsStyle == "success" || this.state.user.password.bsStyle == "warning") && 
        this.state.user.password_confirmation.bsStyle == "success") 
    {
      this.setState({ disabled: "" });
    }else {
      this.setState({ disabled: "disabled" });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    UserAPIUtils.signUp({
      icon_data: this.state.user.icon.value,
      name: this.state.user.name.value,
      mail: this.state.user.mail.value,
      password: this.state.user.password.value,
      password_confirmation: this.state.user.password_confirmation.value,
      provider: "own"
    });
  }

  handleInput(e) {
    let action = Constants.ActionTypes.USER.SIGN_UP;
    var data = e.target.value;
    var actionType = '';
    switch(e.target.id) {
      case "icon":
        data = e.target.files;
        actionType = action.CHANGE_ICON;
        break;
      case "name":
        actionType = action.CHANGE_NAME;
        break;
      case "mail":
        actionType = action.CHANGE_MAIL;
        break;
      case "password":
        actionType = action.CHANGE_PASSWORD;
        break;
      case "password_confirmation":
        actionType = action.CHANGE_PASSWORD_CONFIRMATION;
        break;
    }
    SignUpActionCreator.changeInput(data, actionType);
  }

  handleAlertDismiss(e) {
    this.setState({ alertVisible: false });
  }

  render() {
    return (
      <div className="SignUp" style={styles.SignUp}>
        <AlertBox msg={this.state.errMsg} alertVisible={this.state.alertVisible} handleAlertDismiss={this.handleAlertDismiss} />
        <div style={styles.padding}></div>
        <div style={styles.formContainer}>
          <form style={FormStyle.container} onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div>
              <img src={this.state.user.icon.value} style={styles.icon} /> 
            </div>
            <Input type='file' help='jpg, jpeg, png(7M以下)' id="icon" onChange={this.handleInput} />
            <span style={styles.errSpan}>{this.state.user.icon.errMsg}</span>
            <Input type='text' placeholder='ユーザ名' label='' style={styles.input} id="name" onChange={this.handleInput} value={this.state.user.name.value} bsStyle={this.state.user.name.bsStyle} hasFeedback />
            <span style={styles.errSpan}>{this.state.user.name.errMsg}</span>
            <Input type='text' placeholder='メールアドレス' id="mail" onChange={this.handleInput} value={this.state.user.mail.value} bsStyle={this.state.user.mail.bsStyle} hasFeedback />
            <span style={styles.errSpan}>{this.state.user.mail.errMsg}</span>
            <Input type='password' placeholder='パスワード' id="password" onChange={this.handleInput} value={this.state.user.password.value} bsStyle={this.state.user.password.bsStyle} hasFeedback />
            <span style={styles.errSpan}>{this.state.user.password.errMsg}</span>
            <Input type='password' placeholder='パスワード（確認）' id="password_confirmation" onChange={this.handleInput} value={this.state.user.password_confirmation.value} bsStyle={this.state.user.password_confirmation.bsStyle} hasFeedback />
            <span style={styles.errSpan}>{this.state.user.password_confirmation.errMsg}</span>
            <ButtonInput type='submit' value='登録' bsStyle='success' style={styles.submit} disabled={this.state.disabled} />
          </form>
        </div>
        <div style={styles.padding}></div>
      </div>
    );
  }
}

ReactMixin(SignUp.prototype, [React.addons.LinkedStateMixin, DeepLinkedState]);

export default Radium(SignUp);
