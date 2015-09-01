import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import Constants from '../../../constants/constants';

var styles = Vendor.prefix({
  container: {
    flexFlow:'row nowrap',
    //width:'130px',
    height:'30px',
    padding:'0px 60px',
    borderRight:'solid 1px rgba(255,255,255,.3)',
    
    ':hover': {
      backgroundColor:'rgba(255,255,255,.07)',
      cursor:'pointer',
    },

  },
  p: {
    fontSize:'14px',
    fontWeight:'bold',
    color:'#afafaf',
    textAlign:'center',
    margin:'0',
    lineHeight:'1.2',
    padding:'6px 0px',
  },
  current: {
    p: {
      color:'#ff9900',
    }
  },
});

class Item extends React.Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.props.handleClick(this.props.page);
  }

  render() {
    return (
      <div style={[
        styles.container,
        this.props.title == Constants.TITLE && { padding:'0px 30px' }
      ]} onClick={this._handleClick}>
        <p style={[
          styles.p,
          this.props.current && styles.current.p
        ]}>{this.props.children}</p>
      </div>
    );
  }
}

Item.propTypes = {
  page: React.PropTypes.string.isRequired,
  current: React.PropTypes.bool.isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

export default Radium(Item);
