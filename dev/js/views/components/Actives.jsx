import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import TODOActionCreator from '../../action_creators/TODOActionCreator';
import BoardStore from '../../stores/BoardStore';
import TODOStore from '../../stores/TODOStore';
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
    this._onSelect = this._onSelect.bind(this);

    TODOActionCreator.getTODOs(this.props.boardId);
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
      todos: TODOStore.getTODOs(),
    });
  }

  _onSelect() {
    TODOActionCreator.getTODOs(BoardStore.getCurrentBoard().id);
  }

  render() {
    return (
      <div style={styles.container}>
        {(() => {
          return Object.keys(this.state.todos).map((id) => {
            return <TODOPane boardId={this.props.boardId} todo={this.state.todos[id]} handlePaneDelete={this.props.deletePane} />;
          });
        })()}
        <AddPane addTODO={this.props.createPane} />
      </div>
    );
  }
}

Actives.propTypes = {
  boardId: React.PropTypes.number.isRequired,
  createPane: React.PropTypes.func.isRequired,
  deletePane: React.PropTypes.func.isRequired,
};

export default Radium(Actives);
