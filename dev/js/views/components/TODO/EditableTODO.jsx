import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Input, Button, Glyphicon } from 'react-bootstrap';

import BaseTODO from './Base';
import MovableView from './MovableView';
import InputView from './InputView';

var styles = Vendor.prefix({
  container: {
    display:"table",
    padding:"3px",
    width:"100%",
  },
  emptyspan: {
    padding:'21px 0px 21px 30px',
  },
  span: {
    display:"table-cell",
    verticalAlign:"middle",
    color:"#5c5c5c",
    textAlign:"left",
    fontSize:"16px",
    fontWeight:"normal",
    width:"100%",
    padding:"10px 0px 10px 30px",
  },
  sideButtonContainer: {
    display:"table-cell"
  },
  editButton: {
    backgroundColor:"rgba(0,0,0,0)",
    border:"solid 0px rgba(0,0,0,0)",
    margin:"0",
    padding:"0",
    color:"rgba(80,80,170,1)",
  },
  plusButton: {
    backgroundColor:"rgba(0,0,0,0)",
    border:"solid 0px rgba(0,0,0,0)",
    margin:"0",
    padding:"0",
    color:"rgba(100,180,100,1)",
  },
});

class EditableTODO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      edit: false,
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this._handleEdit = this._handleEdit.bind(this);
    this._handlePlus = this._handlePlus.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this._handleTrash = this._handleTrash.bind(this);
  }

  onMouseEnter(e) {
    this.setState({ showMenu: true });
  }

  onMouseLeave(e) {
    this.setState({ showMenu: false });
  }

  _handleEdit(e) {
    this.setState({ edit: true });
  }

  _handlePlus() {
    this.props.handlePlus(this.props.id);
  }

  _handleSubmit(content) {
    this.props.handleSubmit(this.props.id, content);
    this.setState({ edit: false });
  }

  _handleCancel() {
    this.setState({ edit: false });
  }

  _handleTrash() {
    this.setState({ edit: false });
    this.props.handleTrash(this.props.id);
  }

  render() {
    if(!this.state.edit && this.props.content.length != 0) {
      var menu = this.state.showMenu ? (
          <div style={styles.sideButtonContainer}>
            <button style={styles.editButton} onClick={this._handleEdit} ><Glyphicon glyph="edit" /></button>
            <button style={styles.plusButton} onClick={this._handlePlus} ><Glyphicon glyph="plus" /></button>
          </div>
      ) : "";
      return (
        <MovableView id={this.props.id} onDragStart={this.props.handleMovingTODOStart} onDragEnter={this.props.handleMovingTODOEnter} >
          <div style={styles.container} key={this.props.id} onClick={this._handleEdit} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <span style={[
              styles.span,
              !this.props.content && styles.emptyspan
            ]}>{this.props.content}</span>
            {menu}
          </div>
        </MovableView>
      );
    }else {
      return (
        <BaseTODO>
          <div style={styles.container}>
            <InputView content={this.props.content} handleSubmit={this._handleSubmit} handleCancel={this._handleCancel} handleTrash={this._handleTrash} />
          </div>
        </BaseTODO>
      );
    }
  }
}

EditableTODO.propTypes = {
  id:   React.PropTypes.number.isRequired,
  content: React.PropTypes.string.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  handlePlus: React.PropTypes.func.isRequired,
  handleTrash: React.PropTypes.func.isRequired,
  handleMovingTODOStart: React.PropTypes.func.isRequired,
  handleMovingTODOEnter: React.PropTypes.func.isRequired,
};

export default Radium(EditableTODO);
