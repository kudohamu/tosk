import React from 'react/addons';
import Vendor from 'react-vendor-prefix';

import BaseTODO from './Base';

var style = Vendor.prefix({
});

export default class MovableView extends React.Component {
  constructor(props) {
    super(props);
    this._onDragStart = this._onDragStart.bind(this, this.props.id);
    this._onDragEnter = this._onDragEnter.bind(this, this.props.id);
  }

  _onDragStart(id) {
    console.log("start");
    this.props.onDragStart(id);
  }

  _onDragEnter(id) {
    this.props.onDragEnter(id);
  }

  render() {
    return (
      <BaseTODO draggable={this.props.movable} id={this.props.id} onDragStart={this.props.onDragStart}>
        <div onDragEnter={this._onDragEnter}>
          {this.props.children}
        </div>
      </BaseTODO>
    );
  }
}

MovableView.propTypes = {
  id: React.PropTypes.number.isRequired,
  onDragStart: React.PropTypes.func.isRequired,
  onDragEnter: React.PropTypes.func.isRequired,
};

MovableView.defaultProps = {
  movable: true,
};
