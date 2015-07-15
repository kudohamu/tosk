import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Button } from 'react-bootstrap';

import SmallModal from './ConfirmationModal/SmallModal';
import BoardAPIUtils from '../../utils/BoardAPIUtils';

var styles = Vendor.prefix({
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
  }

  _handleDeleteButtonClick() {
    this.setState({ deleteConfirmation: true });
  }

  _handleBoardDeleteSubmit() {
    this.setState({ deleteConfirmation: false });
    BoardAPIUtils.delete(this.props.boardId);
  }

  _handleBoardDeleteCancel() {
    this.setState({ deleteConfirmation: false });
  }

  render() {
    return (
      <div>
      {
        this.state.deleteConfirmation ?
        <SmallModal title='Boardを削除しますか？' handleSubmit={this._handleBoardDeleteSubmit} handleCancel={this._handleBoardDeleteCancel} onRequestHide={this._handleBoardDeleteCancel} >
          <p>Boardを削除するとBoard内のTODOリストもすべて削除されます。</p>
          <p>よろしいですか？</p>
        </SmallModal>
        :''
      }
        <h1>Settings</h1>
        <Button bsStyle='danger' onClick={this._handleDeleteButtonClick} >Boardを削除する</Button>
      </div>
    );
  }
}

Settings.propTypes = {
  boardId: React.PropTypes.number.isRequired,
};

export default Radium(Settings);
