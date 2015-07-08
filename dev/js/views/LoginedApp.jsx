import React from 'react';
import Router from 'react-router';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

const HEADER_HEIGHT = '30px';
let styles = Vendor.prefix({
  container: {
    display:'flex',
    width:'100%',
    height:'100%',
  },
  middleContainer: {
    display:'flex',
    width:'100%',
    height:'100%',
    paddingTop:HEADER_HEIGHT,
  },
  header: {
    position:'absolute',
    width:'100%',
    height:HEADER_HEIGHT,
    borderBottom:'solid 1px white',
  },
  sidebar: {
    width:'150px',
    flexFlow:'row nowrap',
    backgroundColor:'#2f2f2f',
  },
  content: {
    width:'100%',
    flexFlow:'row nowrap',
    backgroundColor:'rgba(255,255,255,0.6)',
  }
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
          <div style={styles.middleContainer}>
            <div style={styles.sidebar}>
              <Sidebar />
            </div>
            <div style={styles.content}>
              <RouteHandler />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Radium(LoginedApp);
