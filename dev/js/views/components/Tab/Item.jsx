import React from 'react';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

let styles = Vendor.prefix({
  li: {
    float:'left',
    display:'block',
    marginBottom:'-1px',
    position:'relative',
    height:'42px',
    borderRadius:'4px 4px 0 0',
    border:'soild 1px rgba(221,221,221,0.7)',
    cursor:'pointer',
  },
  a: {
    position:'relative',
    display:'block',
    padding:'10px 15px',
    color:'#4d4d4d',
    backgroundColor:'rgba(221,221,221,0.0)',
    cursor:'pointer',
  },
  current: {
    fontWeight:'bold',
    backgroundColor:'rgba(221,221,221,1)',
  },
});

class Item extends React.Component {
  constructor(props) {
    super(props);

    this._handleTabClick = this._handleTabClick.bind(this, this.props.boardId);
  }

  _handleTabClick(boardId) {
    this.props.handleClick(boardId);
  }

  render() {
    return (
      <li style={styles.li} onClick={this._handleTabClick}>
        <a style={[
          styles.a,
          this.props.current && styles.current
        ]}>{this.props.name}</a>
      </li>
    );
  }
}

Item.propTypes = {
  boardId: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  current: React.PropTypes.bool.isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

export default Radium(Item);
