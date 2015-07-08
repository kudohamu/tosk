import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Alert } from 'react-bootstrap';

var styles = Vendor.prefix({
  alertContainer: {
    position:"absolute",
    top:"20px",
    width:"100%",
  },
  alert: {
    margin:"0 auto",
    marginLeft:"50px",
    marginRight:"50px",
    padding:"20px 40px",
  },
});

class AlertBox extends React.Component {
  constructor(props) {
    super(props);

    this._handleAlertDismiss = this._handleAlertDismiss.bind(this);
  }

  _handleAlertDismiss() {
    this.props.handleAlertDismiss();
  }

  render() {
    if (this.props.alertVisible) {
      return (
        <div style={styles.alertContainer}>
          <Alert bsStyle="danger" style={styles.alert} onDismiss={this._handleAlertDismiss}>
            <p>{this.props.msg}</p>
          </Alert>
        </div>
      );
    }else {
      return(<div style={styles.alertContainer} ></div>);
    }
  }
}

AlertBox.propTypes = {
  msg: React.PropTypes.string.isRequired,
  alertVisible: React.PropTypes.bool.isRequired,
  handleAlertDismiss: React.PropTypes.func.isRequired
};

export default Radium(AlertBox);
