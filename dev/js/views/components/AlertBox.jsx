var React = require('react/addons'),
    Vendor = require('react-vendor-prefix'),

    Alert = require('react-bootstrap').Alert
;

var style = Vendor.prefix({
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

var AlertBox = React.createClass({
  propTypes: {
    msg: React.PropTypes.string.isRequired,
    alertVisible: React.PropTypes.bool.isRequired,
    handleAlertDismiss: React.PropTypes.func.isRequired
  },
  _handleAlertDismiss() {
    this.props.handleAlertDismiss();
  },
  render() {
    if (this.props.alertVisible) {
      return (
        <div style={style.alertContainer}>
          <Alert bsStyle="danger" style={style.alert} onDismiss={this._handleAlertDismiss}>
            <p>{this.props.msg}</p>
          </Alert>
        </div>
      );
    }else {
      return(<div style={style.alertContainer} ></div>);
    }
  }
});

module.exports = AlertBox;
