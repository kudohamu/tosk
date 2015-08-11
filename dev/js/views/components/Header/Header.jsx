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
    title: 'Tosk',
    path: 'tosk',
  },
  {
    title: 'Dashboard',
    path: 'dashboard',
  },
  {
    title: 'Public Templates',
    path: 'public_templates',
  },
  {
    title: 'Profile',
    path: 'profile',
  },
  {
    title: 'Settings',
    path: 'settings',
  },
  {
    title: 'SignOut',
    path: 'logout',
  }
];

class Header extends React.Component {
  constructor() {
    super();

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(next_page) {
  }

  pageCheck(page) {
    if(page == 'tosk') {
      return true;
    }else {
      return page == this.props.page;
    }
  }

  render() {
    return (
      <div style={styles.container}>
        {
          items.map((item) => {
            return (
              <Item title={item.title} handleClick={this._handleClick} current={this.pageCheck(item.path)} />
            );
          })
        }
      </div>
    );
  }
}

Header.propTypes = {
  page: React.PropTypes.string.isRequired,
}

export default Radium(Header);
