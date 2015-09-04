import React from 'react';
import Vendor from 'react-vendor-prefix';

import UserStore from '../stores/UserStore';
import PageStore from '../stores/PageStore';
import PageActionCreator from '../action_creators/PageActionCreator';

import App from './App';
import LoginedApp from './LoginedApp';
import Top from './Top';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Loading from './components/Loading';

/*
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

var routes = (
  <Route name="app" handler={App} path="/">
    <DefaultRoute handler={Top} />
    <Route path="user/sign_up" handler={SignUp} />
    <Route name="account" handler={LoginedApp} path="account">
      <Route name='loadingDashboard' path="dashboard" Handler={Dashboard} />
      <Route name='dashboard' path="dashboard/:boardId" Handler={Dashboard}>
        <Route name="actives" handler={Actives} />
        <Route name="templates" handler={Dashboard} />
        <Route name="invite" handler={Invite} />
        <Route name="settings" handler={Settings} />
        <Route name="logs" handler={Logs} />
      </Route>
    </Route>
  </Route>
);
*/

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
      if(authData.id && authData.token) {
        PageActionCreator.setPage('Dashboard');
      }else {
        PageActionCreator.setPage('Top');
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
              case 'Top':
                return (<Top />);
              case 'loading':
                return (<Loading />);
              case 'SignUp':
                return (<SignUp />);
              default:
                return (<LoginedApp current_page={this.state.page} />);
            }
          })()
        }
      </div>
    );
  }
}

React.render(<Main />, document.body);
