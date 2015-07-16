import React from 'react';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import Router from 'react-router';

let Link = Router.Link;

let styles = Vendor.prefix({
  li: {
    float:'left',
    display:'block',
    marginBottom:'-1px',
    position:'relative',
    height:'42px',
    borderRadius:'4px 4px 0 0',
    border:'soild 1px rgba(221,221,221,0.7)',
  },
  a: {
    position:'relative',
    display:'block',
    padding:'10px 15px',
    color:'#4d4d4d',
    backgroundColor:'rgba(221,221,221,0.0)',
  },
  current: {
    position:'relative',
    display:'block',
    padding:'10px 15px',
    color:'#4d4d4d',
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
      <li style={styles.li}>
        <Link style={styles.a} activeStyle={styles.current} to={this.props.path} role='button' params={{boardId: this.props.boardId}} onClick={this._handleTabClick}>{this.props.name}</Link>
      </li>
    );
  }
}

Item.propTypes = {
  boardId: React.PropTypes.number.isRequired,
  path: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

Item.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Radium(Item);
