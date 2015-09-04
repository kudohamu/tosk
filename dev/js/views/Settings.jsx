import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import Constants from '../constants/Constants';
import FormStyle from '../styles/form';
import { HEADER_HEIGHT } from '../styles/Header/GlobalStyles';

import UserStore from '../stores/UserStore';
import UserActionCreator from '../action_creators/UserActionCreator';

import UserForm from './components/Form/UserForm';

var styles = Vendor.prefix({
  settings: {
    width:'100%',
    height:'100%',
    paddingTop:HEADER_HEIGHT,
  },
  container: {
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(255,255,255,.6)',
  },
  content: {
    padding:'10px 20px',
  },
  noMargin: {
    margin:'0',
  },
  form: {
    width:'400px',
    margin:'0 auto',
  }
});

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: UserStore.getAccountData(),
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleUpdateUserInfo = this._handleUpdateUserInfo.bind(this);
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
      errMsg: UserStore.getErrMsg(),
      signUpSuccess: UserStore.getSignUpSuccess(),
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

  _handleUpdateUserInfo(icon_data, name, mail, password, passwordConfirmation) {
    const user = icon_data == '' ?
    { name: name, mail: mail }
    :
    { icon_data: icon_data, name: name, mail: mail};

    UserActionCreator.update(user);
  }

  render() {
    return (
      <div style={styles.settings}>
        <div style={styles.container}>
          <div style={styles.content}>
            <h3 style={styles.noMargin}>Profile</h3>
            <hr />
            <div style={styles.form}>
              <UserForm
                icon={this.state.user.icon}
                name={this.state.user.name}
                mail={this.state.user.mail}
                handleSubmit={this._handleUpdateUserInfo}

                needIcon={false}
                needPassword={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
};

export default Radium(Settings);
