import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import InputView from './InputView';

import { Input, Button, Glyphicon } from 'react-bootstrap';

var styles = Vendor.prefix({
  container: {
    display:"inline-block",
    verticalAlign: 'top',
  },
  pane: {
    position:"relative",
    backgroundColor:"rgba(0,0,0,0.2)",
    borderRadius:"6px 6px 6px 6px",
    width:"300px",
    border:"solid 1px rgba(44,44,44,0.2)",
    margin:"0",
  },
  header: {
    position:"relative",
    width:"100%",
    textAlign:"center",
    backgroundColor:"#ffb2d8",
    padding:"10px 10px",
    borderRadius:"6px 6px 6px 6px",
  },
  textarea: {
    resize:"vertical",
    height:"35px",
  },
  addButton: {
    marginTop:"-10px",
    marginBottom:"3px",

    ':focus': {
      outline:'none',
    },
  },
});

class AddPane extends React.Component {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit() {
    this.props.addTODO(React.findDOMNode(this.refs.title).children[0].value);
  }

  render() {
    return (
      <div style={styles.container} onClick={this._onClick}>
        <div style={styles.pane}>
          <div style={styles.header}>
            <Input type='textarea' style={styles.textarea} ref='title' placeholder='タイトル' />
            <Button bsStyle='success' bsSize='' style={styles.addButton} onClick={this._handleSubmit} >Add</Button>
          </div>
        </div>
      </div>
    );
  }
}

AddPane.propTypes = {
  addTODO: React.PropTypes.func.isRequired,
};

export default Radium(AddPane);
