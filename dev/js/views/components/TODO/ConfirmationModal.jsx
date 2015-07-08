import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Modal, Button } from 'react-bootstrap';

var styles = Vendor.prefix({
  container: {
    position:'relative',
    padding:'8px',
  },
  title: {
    position:'relative',
    top:'8px',
    textAlign:'center',
    fontSize:'18px',
    fontWeight:'bold',
    margin:'0',
  },
  body: {
  
  },
  submitButton: {
    position:'absolute',
    right:'8px',
    width:'70px',
  }
});

class ConfirmationModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal bsSize='small' aria-labelledby='contained-modal-title-sm'>
        <div style={styles.container}>
          <p style={styles.title}>{this.props.title}</p>
          <hr />
          <div style={styles.body}>{this.props.children}</div>
          <Button bsStyle='danger' onClick={this.props.handleCancel}>Cancel</Button>
          <Button bsStyle='success' style={styles.submitButton} onClick={this.props.handleSubmit}>OK</Button>
        </div>
      </Modal>
    );
  }
}

ConfirmationModal.propTypes = {
  title: React.PropTypes.string,
  handleCancel: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
};

export default Radium(ConfirmationModal);
