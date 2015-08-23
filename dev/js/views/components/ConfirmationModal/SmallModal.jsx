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
  buttonWrapper: {
    display:'inline-block',
    position:'absolute',
    right:'8px',
  },
  cancelableButtonWrapper: {
    display:'block',
    position:'static',
    right:'0px',
    width:'70px',
    marginLeft:'auto',
    marginRight:'auto',
  },
  submitButton: {
    width:'70px',
  }
});

class SmallModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal bsSize='small' aria-labelledby='contained-modal-title-sm' onRequestHide={this.props.onRequestHide}>
        <div style={styles.container}>
          <p style={styles.title}>{this.props.title}</p>
          <hr />
          <div style={styles.body}>{this.props.children}</div>
          {(() => {
            if (this.props.cancelable) {
              return (<Button bsStyle='danger' onClick={this.props.handleCancel}>Cancel</Button>);
            }
          })()}
          <div style={[
            styles.buttonWrapper,
            !this.props.cancelable && styles.cancelableButtonWrapper
          ]} >
            <Button style={styles.submitButton} bsStyle='success' onClick={this.props.handleSubmit}>OK</Button>
          </div>
        </div>
      </Modal>
    );
  }
}

SmallModal.propTypes = {
  title: React.PropTypes.string,
  handleCancel: React.PropTypes.func,
  handleSubmit: React.PropTypes.func.isRequired,
  onRequestHide: React.PropTypes.func.isRequired,
};

SmallModal.defaultProps = {
  cancelable: true,
}

export default Radium(SmallModal);
