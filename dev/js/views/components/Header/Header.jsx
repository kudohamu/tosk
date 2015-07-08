import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import {XRegExp} from 'xregexp';

import Item from './Item';

var styles = Vendor.prefix({
  container: {
    display:'flex',
    width:'100%',
    height:'100%',
  }
});

var items = [
  {
    title: 'Dashboard',
    path: 'account/dashboard',
  },
  {
    title: 'Public Templates',
    path: 'account/public_templates',
  },
  {
    title: 'Profile',
    path: 'account/profile',
  },
  {
    title: 'Settings',
    path: 'account/settings',
  },
  {
    title: 'LogOut',
    path: 'account/logout',
  }
];

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      current_path: window.location.href,
    }

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(next_path) {
    this.setState({ current_path: next_path });
    window.location.href = next_path;
  }

  _pathCheck(path) {
    return XRegExp.test(window.location.href, XRegExp(path));
  }

  render() {
    return (
      <div style={styles.container}>
        {
          items.map((item) => {
            return (
              <Item title={item.title} path={`/#/${item.path}`} handleClick={this._handleClick} current={this._pathCheck(`/#/${item.path}`)} />
            );
          })
        }
      </div>
    );
  }
}

export default Radium(Header);
