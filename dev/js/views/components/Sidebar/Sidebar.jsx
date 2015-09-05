import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import {XRegExp} from 'xregexp';

import Constants from '../../../constants/constants';
import Item from './Item';

var styles = Vendor.prefix({
  container: {
    width:'100%',
    height:'100%',
  }
});

var items = [
  {
    icon: 'certificate',
    iconColor: 'rgba(246,54,65,1)',
    title: Constants.SIDEBAR.ACTIVES,
  },
  {
    icon: 'bookmark',
    iconColor: 'rgba(85,76,210,1)',
    title: Constants.SIDEBAR.TEMPLATES,
  },
  /*
  {
    icon: 'user',
    iconColor: 'rgba(111,223,95,1)',
    title: Constants.SIDEBAR.MEMBERS,
  },
  */
  {
    icon: 'cog',
    iconColor: 'rgba(236,228,209,1)',
    title: Constants.SIDEBAR.SETTINGS,
  }
  /*
  ,
  {
    icon: 'align-left',
    iconColor: 'rgba(255,255,69,1)',
    title: Constants.SIDEBAR.LOGS,
  }
  */
];

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
    }

  }

  render() {
    return (
      <div style={styles.container}>
        {
          items.map((item) => {
            return (
              <Item icon={item.icon} iconColor={item.iconColor} title={item.title} current={this.props.current == item.title} handleClick={this.props.handleSidebarClick} />
            );
          })
        }
      </div>
    );
  }
}

Sidebar.propTypes = {
  boardId: React.PropTypes.number.isRequired,
  current: React.PropTypes.string.isRequired,
  handleSidebarClick: React.PropTypes.func.isRequired,
};

export default Radium(Sidebar);
