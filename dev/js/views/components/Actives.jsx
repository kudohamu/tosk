import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import UserStore from '../../stores/UserStore';
import TODOActionCreator from '../../action_creators/TODOActionCreator';
import TODOStore from '../../stores/TODOStore';
import TODOAPIUtils from '../../utils/TODOAPIUtils';
import TODOPane from './TODO/Pane';
import AddPane from './TODO/AddPane';

var styles = Vendor.prefix({
  container: {
  }
});

class Actives extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos_num: 0,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._createPane = this._createPane.bind(this);
  }

  componentDidMount() {
    TODOStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TODOStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      todos_num: TODOStore.getTODOs().length,
    });
  }

  sendTODO() {
    this._chan.push("change", {body: "change"});
  }

  _createPane(title) {
    TODOActionCreator.createTODO(this.props.boardId, title);
  }

  render() {
    return (
      <div style={styles.container}>
        {(() => {
          var panes = [];
          for(var i=0; i < this.state.todos_num; i++) {
            panes.push(<TODOPane id={i} />);
          }
          return panes;
        })()}
        <AddPane addTODO={this._createPane} />
      </div>
    );
  }
}

Actives.propTypes = {
  boardId: React.PropTypes.number.isRequired,
};

export default Radium(Actives);
