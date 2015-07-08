import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import UserStore from '../stores/UserStore';
import UserAPIUtils from '../utils/UserAPIUtils';
import DashboardActionCreator from '../action_creators/DashboardActionCreator';
import Constants from '../constants/Constants';

import { Button, ButtonInput, Input } from 'react-bootstrap';

import TODOPane from './components/TODO/Pane';

var styles = Vendor.prefix({
  tab_area: {
    width:"100%",
    height:"100%"
  },
  tab_header: {
    own: {
      width:"100%",
      height:"42px",
      overflowX:"scroll",
      backgroundColor:"rgba(255,255,255,0.01)",
    },
    ul: {
      maxWidth:"10000px",
      height:"42px",
      borderBottomColor:"rgb(221, 221, 221)",
    },
    li: {
      float:"left",
      display:"block",
      marginBottom:"-1px",
      position:"relative",
      height:"42px",
    },
    a: {
      negative: {
        position:"relative",
        display:"block",
        padding:"10px 15px",
        borderRadius:"4px 4px 0 0",
        marginRight:"2px",
        backgroundColor:"rgba(221,221,221,0.8)",
      },
      active: {
        position:"relative",
        display:"block",
        padding:"10px 15px",
        borderRadius:"4px 4px 0 0",
        marginRight:"2px",
        textDecoration:"none",

        color:"#555",
        cursor:"default",
        backgroundColor:"#fff",
        border:"1px solid #ddd",
        borderBottomColor:"transparent",
      }
    }
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
          name: '開発'
        },
        {
          id: 2,
          name: '料理'
        }
      ]
    }
  }

  render() {
    var items = this.state.items.map(function(item) {
      return (
        <li className="" style={styles.tab_header.li} key={item.id}><a href="#/user/dashboard" role="button" style={styles.tab_header.a.negative}>{item.name}</a></li>
      );
    });
    return(
      <div style={styles.tab_area}>
        <div style={styles.tab_header.own}>
          <ul className="nav nav-tabs" style={styles.tab_header.ul}>
            {items}
          </ul>
        </div>
        <div style={styles.tab_body}>
          <TODOPane id={0} />
        </div>
      </div>
    );
  }
}

export default Radium(Dashboard);
