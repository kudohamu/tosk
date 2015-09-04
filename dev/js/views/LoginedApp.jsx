import React from 'react';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import UserActionCreator from '../action_creators/UserActionCreator';
import ChannelStore from '../stores/ChannelStore';
import Header from './components/Header/Header';
import Dashboard from './Dashboard';
import Settings from './Settings';
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
  constructor(props) {
    super(props);

    UserActionCreator.show();
    ChannelStore.connect();
  }

  render() {
    return (
      <div className='LoginedApp' style={styles.container}>
        <div style={styles.header}>
          <Header current_page={this.props.current_page} />
        </div>
        {
          (() => {
            switch(this.props.current_page) {
              case 'Dashboard':
                return (<Dashboard />);
              case 'Settings':
                return (<Settings />);
            }
          })()
        }
      </div>
    );
  }
}

LoginedApp.propTypes = {
  current_page: React.PropTypes.string.isRequired,
}

export default Radium(LoginedApp);
