import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import TODOActionCreator from '../../action_creators/TODOActionCreator';
import BoardStore from '../../stores/BoardStore';
import TODOStore from '../../stores/TODOStore';
import TODOPane from './TODO/Pane';
import AddPane from './TODO/AddPane';

const TEMPLATE = false;

var styles = Vendor.prefix({
  container: {
  }
});

class Templates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: TODOStore.getTODOs(TEMPLATE),
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._createPane = this._createPane.bind(this);

    TODOActionCreator.getTODOs(this.props.boardId, TEMPLATE);
  }

  componentDidMount() {
    BoardStore.addSelectListener(this._onSelect);
    TODOStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    BoardStore.removeSelectListener(this._onSelect);
    TODOStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      todos: TODOStore.getTODOs(TEMPLATE),
    });
  }

  _onSelect() {
    TODOActionCreator.getTODOs(BoardStore.getCurrentBoard().id, TEMPLATE);
  }

  _createPane(title) {
    this.props.createPane(title, TEMPLATE);
  }

  render() {
    return (
      <div style={styles.container}>
        {(() => {
          return Object.keys(this.state.todos).map((id) => {
            return <TODOPane boardId={this.props.boardId} todo={this.state.todos[id]} handlePaneDelete={this.props.deletePane} active={false} activatePane={this.props.activatePane} />;
          });
        })()}
        <AddPane addTODO={this._createPane} />
      </div>
    );
  }
}

Templates.propTypes = {
  boardId: React.PropTypes.number.isRequired,
  createPane: React.PropTypes.func.isRequired,
  deletePane: React.PropTypes.func.isRequired,
  activatePane: React.PropTypes.func.isRequired,
};

export default Radium(Templates);
