import React from 'react/addons';
import Router from 'react-router';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import { Glyphicon } from 'react-bootstrap';

let Link = Router.Link;

var styles = Vendor.prefix({
  container: {
    width:'100%',
    borderRadius:'3px',
    padding:'7px',
    
    ':hover': {
      backgroundColor:'rgba(255,255,255,.07)',
      cursor:'pointer',
    },

  },
  p: {
    display:'inline',
    fontSize:'18px',
    fontWeight:'bold',
    color:'#7f7f7f',
    margin:'0',
    lineHeight:'1.2',
    padding:'3px 3px 3px 6px',
    textDecoration:'none',
  },
  current: {
    container: {
      backgroundColor:'rgba(255,255,255,.07)',
    },
    p: {
      display:'inline',
      fontSize:'18px',
      fontWeight:'bold',
      color:'rgba(100,100,255,1)',
      margin:'0',
      lineHeight:'1.2',
      padding:'3px 3px 3px 6px',
      textDecoration:'none',
    }
  },
});

class Item extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.props.handleClick(this.props.path);
  }

  render() {
    return (
      <div style={styles.container}>
        <Glyphicon glyph={this.props.icon} style={{color: `${this.props.iconColor}`}} />
        <Link style={styles.p} activeStyle={styles.current.p} to={this.props.path} params={{boardId: this.props.boardId}} onClick={this._handleClick}>{this.props.title}</Link>
      </div>
    );
  }
}

Item.propTypes = {
  boardId: React.PropTypes.number.isRequired,
  icon: React.PropTypes.string.isRequired,
  iconColor: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

export default Radium(Item);
