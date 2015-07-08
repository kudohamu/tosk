import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import BaseFolder from './BaseFolder';

var styles = Vendor.prefix({
});

class MovableFolder extends React.Component {
  constructor(props) {
    super(props);
    this._onDragStart = this._onDragStart.bind(this, this.props.id);
    this._onDragEnter = this._onDragEnter.bind(this, this.props.id);
  }

  _onDragStart(id) {
    this.props.onDragStart(id);
  }

  onDragEnd(e) {
    console.log("end");
  }

  _onDragEnter(id) {
    this.props.onDragEnter(id);
  }

  onDragExit(e) {
    console.log("exit");
  }

  render() {
    return (
      <BaseFolder id={this.props.id} title={this.props.title} open={this.props.open} onClick={this.props.handleClickFolder} handleClickFolder={this.props.handleClickFolder} draggable={this.props.movable}>
        <div onDragStart={this._onDragStart} onDragEnd={this.onDragEnd} onDragEnter={this._onDragEnter} onDragExit={this.onDragExit}>
          {this.props.children}
        </div>
      </BaseFolder>
    );
  }
}

MovableFolder.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  open: React.PropTypes.bool.isRequired,
  handleClickFolder: React.PropTypes.func.isRequired,

  onDragStart: React.PropTypes.func.isRequired,
  onDragEnter: React.PropTypes.func.isRequired,
};

MovableFolder.defaultProps = {
  movable: true,
};

export default Radium(MovableFolder);
