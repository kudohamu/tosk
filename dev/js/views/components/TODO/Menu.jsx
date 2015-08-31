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

    const menuItems = (
      this.props.active ?
      //actives用メニュー
      <MenuItem onSelect={this._handlePaneEdit.bind(this)}>{
        this.props.checkable ?
        '編集モードに切り替え' :
        'チェックモードに切り替え'
      }</MenuItem>
      :
      //templates用メニュー
      <MenuItem onSelect={this.props.handleActivatePane}>アクティブ化する</MenuItem>
    );

    //共通メニュー
    const commonMenuItems = (
      <MenuItem onSelect={this.props.handlePaneDelete}>削除</MenuItem>
    );

    return (
      <div style={styles.container} onClick={this._handleMenuToggle.bind(this)} style={styles.dropdown}>
        <div className={dropdownClass} >
          <ul className="dropdown-menu" >
            { menuItems }
            { commonMenuItems }
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
  handleActivatePane: React.PropTypes.func,
  position: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  }),
  checkable: React.PropTypes.bool.isRequired,
  active: React.PropTypes.bool.isRequired,
};

export default Radium(Menu);
