import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import Constants from '../../../constants/constants';

var styles = Vendor.prefix({
  container: {
    position: 'relative',
    width: '600px',
    height: '80px',
    margin: '0 auto',
    padding: '5px 10px 10px 10px',
    borderRadius: '4px',
    border:"solid 1px rgba(44,44,44,0.2)",

    backgroundColor: '#99ccff',
  },
  successContainer: {
    backgroundColor: '#c1ffc1',
  },
  errorContainer: {
    backgroundColor: '#ffc1c1',
  },
});

class Notification extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={[
        styles.container,
        this.props.category == Constants.NOTIFICATION.SUCCESS && styles.successContainer,
        this.props.category == Constants.NOTIFICATION.ERROR && styles.errorContainer,
      ]} onClick={this.props.onClick}>
        {this.props.content}
      </div>
    );
  }
}

Notification.propTypes = {
  category: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default Radium(Notification);
