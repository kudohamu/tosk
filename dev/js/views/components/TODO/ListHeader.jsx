import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import { ProgressBar } from 'react-bootstrap';

import BaseFolder from './BaseFolder';
import InputView from './InputView';

var styles = Vendor.prefix({
  progress: {
    width: "100%",
    position: "absolute",
    left:"0px",
    bottom:"0px",
    margin:"0",
    height:"4px",
  }
});

class ListHeader extends React.Component {
  render() {
    return (
      <BaseFolder id={this.props.id} title={this.props.title} open={this.props.open} handleClickFolder={this.props.handleClickFolder}>
        <ProgressBar bsStyle="info" style={styles.progress} now={this.props.progress} />
      </BaseFolder>
    );
  }
}

ListHeader.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  progress: React.PropTypes.number,
  open: React.PropTypes.bool.isRequired,
  handleClickFolder: React.PropTypes.func.isRequired,
};

export default Radium(ListHeader);
