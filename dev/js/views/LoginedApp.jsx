import React from 'react';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import Header from './components/Header/Header';
import Dashboard from './Dashboard';
import { HEADER_HEIGHT } from '../styles/Header/GlobalStyles';

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

  render() {
    return (
      <div className='LoginedApp' style={styles.container}>
        <div style={styles.header}>
          <Header page={this.props.page} />
        </div>
        {
          (() => {
            switch(this.props.page) {
              case 'dashboard':
                return (<Dashboard />);
            }
          })()
        }
      </div>
    );
  }
}

LoginedApp.propTypes = {
  page: React.PropTypes.string.isRequired,
}

export default Radium(LoginedApp);
