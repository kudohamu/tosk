import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import UserStore from '../stores/UserStore';
import UserAPIUtils from '../utils/UserAPIUtils';
import DashboardActionCreator from '../action_creators/DashboardActionCreator';
import Constants from '../constants/Constants';

import { Button, ButtonInput, Input } from 'react-bootstrap';

import TODOPane from './components/TODO/Pane';
import TabHeader from './components/Tab/Header';

var styles = Vendor.prefix({
  tab_area: {
    width:"100%",
    height:"100%"
  },
  tab_body: {
    width:"100%",
    height:"100%",
    padding:"5px",
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          title: '開発'
        },
        {
          id: 2,
          title: '料理'
        }
      ]
    }
    console.log(UserStore.getAccountData().id);
    console.log(UserStore.getAccountData().token);
  }

  render() {
    return(
      <div style={styles.tab_area}>
        <TabHeader items={this.state.items} />
        <div style={styles.tab_body}>
          <TODOPane id={0} />
        </div>
      </div>
    );
  }
}

export default Radium(Dashboard);
