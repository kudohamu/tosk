import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

var styles = Vendor.prefix({
  container: {
    flexFlow:'row nowrap',
    //width:'130px',
    height:'30px',
    padding:'0px 15px',
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
    this._handleClick = this._handleClick.bind(this, this.props.path);
  }

  _handleClick(path) {
    this.props.handleClick(path);
  }

  render() {
    return (
      <div style={styles.container} onClick={this._handleClick}>
        <p style={[
          styles.p,
          this.props.current && styles.current.p
        ]}>{this.props.title}</p>
      </div>
    );
  }
}

Item.propTypes = {
  title: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired,
  current: React.PropTypes.bool.isRequired,
};

export default Radium(Item);
