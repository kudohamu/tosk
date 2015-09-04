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
import Title from './Title';

var styles = Vendor.prefix({
  container: {
    display:'flex',
    width:'100%',
    height:'100%',
  }
});

var items = [
  {
    title: Constants.PAGE.DASHBOARD,
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
    title: Constants.PAGE.SETTINGS,
  },
  {
    title: Constants.PAGE.SIGN_OUT,
  }
];

class Header extends React.Component {
  constructor() {
    super();

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(next_page) {
    if(next_page == Constants.PAGE.SIGN_OUT) {
      Object.keys(BoardStore.getBoards()).map((id) => {
        DashboardActionCreator.removeActionListener(id);
      });
      UserActionCreator.signOut();
      PageActionCreator.setPage(Constants.PAGE.TOP);
    }else {
      PageActionCreator.setPage(next_page);
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <Title />
        {
          items.map((item) => {
            return (
              <Item page={item.title} handleClick={this._handleClick} current={item.title == this.props.current_page} >{item.title}</Item>
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
