import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Glyphicon } from 'react-bootstrap';

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
    //textAlign:'center',
    margin:'0',
    lineHeight:'1.2',
    padding:'3px 3px 3px 6px',
  },
  current: {
    container: {
      backgroundColor:'rgba(255,255,255,.07)',
    },
    p: {
      color:'rgba(100,100,255,1)',
    }
  },
});

class Item extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this, this.props.path);
  }

  _handleClick(path) {
    this.props.handleClick(path);
  }

  render() {
    return (
      <div style={[
        styles.container,
        this.props.current && styles.current.container
      ]} onClick={this._handleClick}>
        <Glyphicon glyph={this.props.icon} style={{color: `${this.props.iconColor}`}} />
        <p style={[
          styles.p,
          this.props.current && styles.current.p
        ]}>{this.props.title}</p>
      </div>
    );
  }
}

Item.propTypes = {
  icon: React.PropTypes.string.isRequired,
  iconColor: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired,
  current: React.PropTypes.bool.isRequired,
};

export default Radium(Item);
