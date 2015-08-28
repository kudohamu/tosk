import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Button, Input } from 'react-bootstrap';

import SmallModal from './ConfirmationModal/SmallModal';
import DashboardActionCreator from '../../action_creators/DashboardActionCreator';
import TODOActionCreator from '../../action_creators/TODOActionCreator';

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
    };

    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._handleBoardDeleteSubmit = this._handleBoardDeleteSubmit.bind(this);
    this._handleBoardDeleteCancel = this._handleBoardDeleteCancel.bind(this);
    this._handleBoardNameUpdate = this._handleBoardNameUpdate.bind(this);
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
          <Input type='text' style={styles.boardName} bsSize='large' placeholder='Board名' buttonAfter={<Button type='text' bsStyle='success' onClick={this._handleBoardNameUpdate} >変更</Button>} defaultValue={this.props.boardName} ref='boardName' />
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
  boardName: React.PropTypes.string.isRequired,
};

export default Radium(Settings);
