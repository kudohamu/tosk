import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Button, Input } from 'react-bootstrap';

import SmallModal from './ConfirmationModal/SmallModal';
import DashboardActionCreator from '../../action_creators/DashboardActionCreator';
import TODOActionCreator from '../../action_creators/TODOActionCreator';
import BoardStore from '../../stores/BoardStore';

var styles = Vendor.prefix({
  container: {
    padding: '10px',
  },
  boardNameContainer: {
    width: '400px',
    margin: '0 auto',
  },
  boardName: {
    display: 'inline-block',
    width: '400px',
  },
  deleteBoardContainer: {
    margin: '0 auto',
    width: '140px',
  }
});

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteConfirmation: false,
      board: BoardStore.getCurrentBoard(),
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleInput = this._handleInput.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._handleBoardDeleteSubmit = this._handleBoardDeleteSubmit.bind(this);
    this._handleBoardDeleteCancel = this._handleBoardDeleteCancel.bind(this);
    this._handleBoardNameUpdate = this._handleBoardNameUpdate.bind(this);
  }

  componentDidMount() {
    BoardStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    BoardStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.state = {
      board: BoardStore.getCurrentBoard(),
    };

  }

  _handleInput(e) {
    this.setState({
      board: {
        id: this.state.board.id,
        name: e.target.value,
      }
    });
  }

  _handleDeleteButtonClick() {
    this.setState({ deleteConfirmation: true });
  }

  _handleBoardDeleteSubmit() {
    this.setState({ deleteConfirmation: false });
    DashboardActionCreator.deleteBoard(this.props.boardId);
  }

  _handleBoardDeleteCancel() {
    this.setState({ deleteConfirmation: false });
  }

  _handleBoardNameUpdate() {
    DashboardActionCreator.updateBoard(this.props.boardId, this.state.board.name);
  }

  render() {
    return (
      <div style={styles.container}>
        {
          this.state.deleteConfirmation ?
          <SmallModal title='Boardを削除しますか？' handleSubmit={this._handleBoardDeleteSubmit} handleCancel={this._handleBoardDeleteCancel} onRequestHide={this._handleBoardDeleteCancel} >
            <p>Boardを削除するとBoard内のTODOリストもすべて削除されます。</p>
            <p>よろしいですか？</p>
          </SmallModal>
          :''
        }
        <div style={styles.boardNameContainer}>
          <Input type='text' style={styles.boardName} bsSize='large' placeholder='Board名' buttonAfter={<Button type='text' bsStyle='success' onClick={this._handleBoardNameUpdate} >変更</Button>} value={this.state.board.name} onChange={this._handleInput} />
        </div>
        <h3>Boardの削除</h3>
        <hr />
        <div style={styles.deleteBoardContainer}>
          <Button bsStyle='danger' onClick={this._handleDeleteButtonClick} >削除する</Button>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  boardId: React.PropTypes.number.isRequired,
};

export default Radium(Settings);
