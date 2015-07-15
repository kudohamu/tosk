import React from 'react';
import Router from 'react-router';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import Header from './components/Header/Header';
import Dashboard from './Dashboard';
import { HEADER_HEIGHT } from '../styles/Header/GlobalStyles';

const RouteHandler = Router.RouteHandler;

let styles = Vendor.prefix({
  container: {
    display:'flex',
    width:'100%',
    height:'100%',
  },
  header: {
    position:'absolute',
    width:'100%',
    height:HEADER_HEIGHT,
    borderBottom:'solid 1px white',
  },
});

class LoginedApp extends React.Component {
  _checkLogin() {
    console.log('login!');
    return true;
  }

  render() {
    if (this._checkLogin()) {
      return (
        <div className='LoginedApp' style={styles.container}>
          <div style={styles.header}>
            <Header />
          </div>
          <Dashboard />
        </div>
      );
    }
  }
}

export default Radium(LoginedApp);
