import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { ProgressBar, Glyphicon } from 'react-bootstrap';

import BaseTODO from './Base';
import MovableFolder from './MovableFolder';
import MovableView from './MovableView';
import InputView from './InputView';
import ConfirmationModal from './ConfirmationModal';

var styles = Vendor.prefix({
  container: {
    position:"absolute",
    top:"0px",
    left:"0px",
    width:"100%",
    height:"100%",
  },
  inputViewContainer: {
    padding:"3px",
  },
  editButton: {
    position:"absolute",
    top:"15px",
    right:"3px",
    backgroundColor:"rgba(0,0,0,0)",
    border:"solid 0px rgba(0,0,0,0)",
    margin:"0",
    padding:"0px",
    color:"rgba(80,80,170,1)",

    ':focus': {
      outline:'none',
    }
  }
});

class EditableFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      input: false,
      confirmation: false,
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this._handleTrash = this._handleTrash.bind(this);
    this._handleModalSubmit = this._handleModalSubmit.bind(this);
    this._handleModalCancel = this._handleModalCancel.bind(this);
  }

  onMouseEnter(e) {
    this.setState({ showMenu: true });
  }

  onMouseLeave(e) {
    this.setState({ showMenu: false });
  }

  _handleEdit(e) {
    e.stopPropagation();
    this.setState({input: true});
  }

  _handleSubmit(content) {
    this.props.handleSubmit(this.props.id, content);
    this.setState({input: false});
  }

  _handleCancel() {
    this.setState({input: !this.state.input});
  }

  _handleTrash() {
    this.setState({ confirmation: true });
  }

  _handleModalSubmit() {
    this.setState({ confirmation: false });
    this.setState({input: false});
    this.props.handleTrash(this.props.id);
  }

  _handleModalCancel() {
    this.setState({ confirmation: false });
  }

  render() {
    if(this.state.input) {
      return (
        <BaseTODO>
          <div style={styles.inputViewContainer}>
            <InputView id={this.props.id} content={this.props.title} handleSubmit={this._handleSubmit} handleCancel={this._handleCancel} handleTrash={this._handleTrash} />
          </div>
          {
            this.state.confirmation ?
            <ConfirmationModal title='TODOフォルダの削除' handleSubmit={this._handleModalSubmit} handleCancel={this._handleModalCancel} >
              <p>TODOフォルダを削除するとフォルダ内のすべてのTODOも削除されます。<br />
              よろしいですか？</p>
            </ ConfirmationModal>
            :
            ''
          }
        </BaseTODO>
      );
    }else {
      var menu = this.state.showMenu ? <button style={styles.editButton} onClick={this._handleEdit} ><Glyphicon glyph="edit" /></button> : "";
      return (
        <MovableFolder id={this.props.id} title={this.props.title} open={this.props.open} handleClickFolder={this.props.handleClickFolder} onDragStart={this.props.handleMovingTODOStart} onDragEnter={this.props.handleMovingTODOEnter} >
          <div style={styles.container} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className="en">
            {menu}
          </div>
        </MovableFolder>
      );
    }
  }
}

EditableFolder.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  open: React.PropTypes.bool.isRequired,
  handleClickFolder: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handleMovingTODOStart: React.PropTypes.func.isRequired,
  handleMovingTODOEnter: React.PropTypes.func.isRequired,
  handleTrash: React.PropTypes.func.isRequired,
};

export default Radium(EditableFolder);
