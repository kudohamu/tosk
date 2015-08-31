import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import {XRegExp} from 'xregexp';

import Constants from '../../../constants/constants';
import BoardStore from '../../../stores/BoardStore';
import PageActionCreator from '../../../action_creators/PageActionCreator';
import UserActionCreator from '../../../action_creators/UserActionCreator';
import DashboardActionCreator from '../../../action_creators/DashboardActionCreator';

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
    title: Constants.TITLE,
  },
  {
    title: 'Dashboard',
  },
  /*
  {
    title: 'Public Templates',
  },
  */
  /*
  {
    title: 'Profile',
  },
  */
  {
    title: 'Settings',
  },
  {
    title: 'SignOut',
  }
];

class Header extends React.Component {
  constructor() {
    super();

    this._handleClick = this._handleClick.bind(this);
    this.pageCheck = this.pageCheck.bind(this);
  }

  _handleClick(next_page) {
    if(next_page == 'SignOut') {
      Object.keys(BoardStore.getBoards()).map((id) => {
        DashboardActionCreator.removeActionListener(id);
      });
      UserActionCreator.signOut();
      PageActionCreator.setPage('Top');
    }
  }

  pageCheck(page) {
    if(page == Constants.TITLE) {
      return true;
    }else {
      return page == this.props.current_page;
    }
  }

  render() {
    return (
      <div style={styles.container}>
        {
          items.map((item) => {
            return (
              <Item title={item.title} handleClick={this._handleClick} current={this.pageCheck(item.title)} />
            );
          })
        }
      </div>
    );
  }
}

Header.propTypes = {
  current_page: React.PropTypes.string.isRequired,
}

export default Radium(Header);
