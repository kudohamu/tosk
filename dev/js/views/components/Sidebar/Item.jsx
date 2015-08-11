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
      color:'rgba(100,100,255,1)',
    }
  },
});

class Item extends React.Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.props.handleClick(this.props.title);
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
          this.props.current && {color: `${this.props.iconColor}`}
        ]}>{this.props.title}</p>
      </div>
    );
  }
}

Item.propTypes = {
  icon: React.PropTypes.string.isRequired,
  iconColor: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  current: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

export default Radium(Item);
