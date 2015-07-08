import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import BaseTODO from './Base';

var styles = Vendor.prefix({
  container: {
    padding:"3px 3px 3px 8px",
  },
  label: {
    width:"100%",
  },
  checkbox: {
    textAlign:"left",

    ':focus': {
      outline:'none',
    }
  },
  span: {
    color:"#5c5c5c",
    textAlign:"left",
    fontSize:"16px",
    fontWeight:"normal",
    width:"100%",
    paddingLeft:"5px",
  },
});

class CheckableTODO extends React.Component {

  _handleCheck(id) {
    this.props.handleCheck(id);
  }

  render() {
    return (
      <BaseTODO key={this.props.id}>
        <div style={styles.container}>
        <div className="checkbox">
          <label style={styles.label}>
            <input type="checkbox" style={styles.checkbox} checked={this.props.checked} onChange={this._handleCheck.bind(this, this.props.id)}/><span style={styles.span}>{this.props.content}</span>
          </label>
        </div>
        </div>
      </BaseTODO>
    );
  }
}

CheckableTODO.propTypes = {
  id: React.PropTypes.number.isRequired,
  content: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool,
  handleCheck: React.PropTypes.func.isRequired,
};

export default Radium(CheckableTODO);
