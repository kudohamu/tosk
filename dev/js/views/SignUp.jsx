import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import FormStyle from '../styles/form';
import Constants from '../constants/Constants';

import UserStore from '../stores/UserStore';
import UserActionCreator from '../action_creators/UserActionCreator';

import UserForm from './components/Form/UserForm';

var styles = Vendor.prefix({
  SignUp: {
    display:'table',
    height:'100%',
    width:'100%',
    tableLayout:'fixed'
  },
  padding: {
    display:'table-cell',
    width:'33%'
  },
  formContainer: {
    display:'table-cell',
    verticalAlign:'middle',
    width:'410px',
  },
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserStore.getAccountData(),
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleSignUp = this._handleSignUp.bind(this);
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
    });
  }

  _handleSignUp(icon_data, name, mail, password, passwordConfirmation) {
    UserActionCreator.create({
      icon_data: icon_data,
      name: name,
      mail: mail,
      password: password,
      password_confirmation: passwordConfirmation,
      provider: 'own'
    });
  }

  render() {
    return (
      <div className='SignUp' style={styles.SignUp}>
        <div style={styles.padding}></div>
        <div style={styles.formContainer}>
          <UserForm
            icon=''
            name=''
            mail=''
            password=''
            passwordConfirmation=''
            handleSubmit={this._handleSignUp}
          />
        </div>
        <div style={styles.padding}></div>
      </div>
    );
  }
}

export default Radium(SignUp);
