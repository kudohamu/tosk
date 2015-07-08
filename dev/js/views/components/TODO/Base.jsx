import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

var styles = Vendor.prefix({
  container: {
    position:"relative",
    width:"100%",
    backgroundColor:"rgba(255,255,255,1)",
    padding:"0px",
    borderBottom:"solid 1px rgba(44,44,44,0.1)",
  },
});

class Base extends React.Component {

  constructor(props) {
    super(props);
    this._onDragStart = this._onDragStart.bind(this, this.props.id);
  }

  _onDragStart(id) {
    this.props.onDragStart(id);
  }

  render() {
    return (
      <div style={styles.container} id={this.props.id} draggable={this.props.draggable} onDragStart={this._onDragStart}>
        {this.props.children}
      </div>
    );
  }
}

Base.propTypes = {
  id: React.PropTypes.number,
  onDragStart: React.PropTypes.func,
};

Base.defaultProps = {
  draggable: false,
}

export default Radium(Base);
