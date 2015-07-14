import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import BoardStore from '../../stores/BoardStore';
import BoardAPIUtils from '../../utils/BoardAPIUtils';

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
      boards: BoardStore.getBoards(),
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleTabPlus = this._handleTabPlus.bind(this);
  }

  componentDidMount() {
    BoardStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    BoardStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({ 
      boards: BoardStore.getBoards(),
    });
  }

  _handleTabPlus(name) {
    BoardAPIUtils.create(name, 1);
  }

  render() {
    return (
      <div style={styles.tab_area}>
        <TabHeader items={this.state.boards} handleTabPlus={this._handleTabPlus} />
        <div style={styles.tab_body}>
          <TODOPane id={0} />
        </div>
      </div>
    );
  }
}

export default Radium(Actives);
