import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { MenuItem, Glyphicon, DropdownButton } from 'react-bootstrap';

var styles = Vendor.prefix({
  container: {
  },
  dropdown: {
    position:"absolute",
    top:"30px",
    right:"30px",
  }
});

class Menu extends React.Component {
  _handleMenuToggle() {
    this.props.handleMenuToggle();
  }

  _handlePaneEdit() {
    this.props.handlePaneEdit();
  }

  render() {
    var dropdownClass = this.props.open ? "dropdown open" : "dropdown";
    return (
      <div style={styles.container} onClick={this._handleMenuToggle.bind(this)} style={styles.dropdown}>
        <div className={dropdownClass} >
          <ul className="dropdown-menu" >
            <MenuItem header>Header</MenuItem>
            <MenuItem onSelect={this._handlePaneEdit.bind(this)}>編集</MenuItem>
            <MenuItem onSelect={this.props.handlePaneDelete}>削除</MenuItem>
          </ul>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  id:   React.PropTypes.number.isRequired,
  open: React.PropTypes.bool,
  handleMenuToggle: React.PropTypes.func.isRequired,
  handlePaneEdit: React.PropTypes.func.isRequired,
  handlePaneDelete: React.PropTypes.func.isRequired,
  position: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  }),
  checkable: React.PropTypes.bool.isRequired,
};

export default Radium(Menu);
