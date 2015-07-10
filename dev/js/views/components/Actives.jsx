import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import UserStore from '../../stores/UserStore';
import UserAPIUtils from '../../utils/UserAPIUtils';

import TODOPane from './TODO/Pane';
import TabHeader from './Tab/Header';

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

class Actives extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: [
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

    this._handleTabPlus = this._handleTabPlus.bind(this);
  }

  _handleTabPlus() {
    console.log('plus');
    this.setState({ tabs: this.state.tabs.concat({
      id: 3,
      title: 'hoge',
    }) })
  }

  render() {
    return (
      <div style={styles.tab_area}>
        <TabHeader items={this.state.tabs} handleTabPlus={this._handleTabPlus} />
        <div style={styles.tab_body}>
          <TODOPane id={0} />
        </div>
      </div>
    );
  }
}

export default Radium(Actives);
