import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Glyphicon } from 'react-bootstrap';

import BaseTODO from './Base';

var styles = Vendor.prefix({
  p: {
    display:"inline",
    color:"#5c5c5c",
    textAlign:"left",
    fontSize:"16px",
    fontWeight:"bold",
    width:"100%",
    margin:"0px 0px",
    padding:"15px 5px 15px 10px",
  },
  icon: {
    position:"relative",
    top:"-1px",
    padding:"15px 0px 19px 10px",
    color:"rgba(245,181,117,0.8)",
  },
});

class BaseFolder extends React.Component {
  constructor(props) {
    super(props);
    this._handleClickFolder = this._handleClickFolder.bind(this, this.props.id);
  }

  _handleClickFolder(id) {
    this.props.handleClickFolder(id);
  }

  render() {
    var glyph = this.props.open ? "folder-open" : "folder-close";
    return (
      <BaseTODO key={this.props.id} draggable={this.props.draggable}>
        <div onClick={this._handleClickFolder}>
          <Glyphicon glyph={glyph} style={styles.icon} />
          <p style={styles.p}>{this.props.title}</p>
          {this.props.children}
        </div>
      </BaseTODO>
    );
  }
}

BaseFolder.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  open: React.PropTypes.bool.isRequired,
  handleClickFolder: React.PropTypes.func.isRequired,
  draggable: React.PropTypes.bool,
};

export default Radium(BaseFolder);
