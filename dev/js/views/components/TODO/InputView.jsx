import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Input, Button, Glyphicon } from 'react-bootstrap';


var styles = Vendor.prefix({
  editBoxContainer: {
    margin:"0",
  },
  textarea: {
    resize:"vertical",
    height:"35px",
  },
  trashButton: {
    position:"relative",
    left:"270px",
    backgroundColor:"rgba(0,0,0,0)",
    border:"solid 0px rgba(0,0,0,0)",
    paddingLeft:"0",
    paddingRight:"0",
    color:"red",

    ':focus': {
      outline:'none',
    },
  },
  saveButton: {
    marginTop:"-10px",
    marginBottom:"3px",

    ':focus': {
      outline:'none',
    },
  },
  cancelButton: {
    position:"absolute",
    right:"0",
    marginRight:"3px",
    marginTop:"-10px",

    ':focus': {
      outline:'none',
    },
  }
});

class InputView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
    this._handleTrash = this._handleTrash.bind(this);
  }

  _handleSubmit() {
    this.props.handleSubmit(React.findDOMNode(this.refs.content).children[0].value);
  }

  _handleCancel() {
    this.props.handleCancel();
  }

  _handleTrash() {
    this.props.handleTrash();
  }

  render() {
    return (
      <div style={styles.editBoxContainer}>
        { 
          this.props.trashable ?
          <button style={styles.trashButton} onClick={this._handleTrash}><Glyphicon glyph="trash" /></button> :
          ''
        }
        <Input type='textarea' style={styles.textarea} defaultValue={this.props.content} ref='content' />
        <Button bsStyle="success" bsSize="small" style={styles.saveButton} onClick={this._handleSubmit}>Save</Button>
        {
          this.props.content.length != 0 ?
          <Button bsStyle="danger" bsSize="small" style={styles.cancelButton} onClick={this._handleCancel}>Cancel</Button> :
          ''
        }
      </div>
    );
  }
}

InputView.propTypes = {
  content: React.PropTypes.string,
  handleSubmit: React.PropTypes.func.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
  handleTrash: React.PropTypes.func.isRequired,
};

InputView.defaultProps = {
  trashable: true,
};

ReactMixin(InputView.prototype, React.addons.LinkedStateMixin);

export default Radium(InputView);
