import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import {XRegExp} from 'xregexp';

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
    title: 'Actives',
    path: 'actives',
  },
  {
    icon: 'bookmark',
    iconColor: 'rgba(85,76,210,1)',
    title: 'Templates',
    path: 'templates',
  },
  {
    icon: 'user',
    iconColor: 'rgba(111,223,95,1)',
    title: 'Invite',
    path: 'invite',
  },
  {
    icon: 'cog',
    iconColor: 'rgba(236,228,209,1)',
    title: 'Settings',
    path: 'settings',
  },
  {
    icon: 'align-left',
    iconColor: 'rgba(255,255,69,1)',
    title: 'Logs',
    path: 'logs',
  }
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
              <Item boardId={this.props.boardId} icon={item.icon} iconColor={item.iconColor} title={item.title} path={item.path} handleClick={this.props.handleSidebarClick} />
            );
          })
        }
      </div>
    );
  }
}

Sidebar.propTypes = {
  boardId: React.PropTypes.number.isRequired,
  handleSidebarClick: React.PropTypes.func.isRequired,
};

export default Radium(Sidebar);
