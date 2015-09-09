import React from 'react';
import Vendor from 'react-vendor-prefix';

import Constants from '../constants/Constants';
import UserStore from '../stores/UserStore';
import PageStore from '../stores/PageStore';
import PageActionCreator from '../action_creators/PageActionCreator';

import LoginedApp from './LoginedApp';
import Top from './Top';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Loading from './components/Loading';
import NotificationPusher from './components/Notification/Pusher';

var styles = Vendor.prefix({
  app: {
    width:'100%',
    height:'100%',
  },
});

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      page: PageStore.getPage(),
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);

    let checkAutoLogin = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let authData = UserStore.getAuthData();
          resolve(authData);
        }, 1000);
      });
    }

    checkAutoLogin().then((authData) => {
      if(authData.id != '' && authData.token != '') {
        PageActionCreator.setPage(Constants.PAGE.DASHBOARD);
      }else {
        PageActionCreator.setPage(Constants.PAGE.TOP);
      }
    });
  }

  componentDidMount() {
    PageStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PageStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({ 
      page: PageStore.getPage(),
    });
  }

  render() {
    return (
      <div style={styles.app}>
        {
          (() => {
            switch(this.state.page) {
              case Constants.PAGE.TOP:
                return (<Top />);
              case Constants.PAGE.LOADING:
                return (<Loading />);
              case Constants.PAGE.SIGN_UP:
                return (<SignUp />);
              default:
                return (<LoginedApp current_page={this.state.page} />);
            }
          })()
        }
        <NotificationPusher/>
      </div>
    );
  }
}

React.render(<Main />, document.body);
