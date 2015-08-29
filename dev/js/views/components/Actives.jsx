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
      todos: TODOStore.getTODOs(),
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._createPane = this._createPane.bind(this);
    this._deletePane = this._deletePane.bind(this);
  }

  componentDidMount() {
    TODOStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TODOStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      todos: TODOStore.getTODOs(this.props.boardId),
    });
  }

  _createPane(title) {
    TODOActionCreator.createTODO(this.props.boardId, title);
  }

  _deletePane(id) {
    TODOActionCreator.deleteTODO(this.props.boardId, id);
  }

  render() {
    return (
      <div style={styles.container}>
        {(() => {
          return Object.keys(this.state.todos).map((id) => {
            return <TODOPane boardId={this.props.boardId} todo={this.state.todos[id]} handlePaneDelete={this._deletePane} />;
          });
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
