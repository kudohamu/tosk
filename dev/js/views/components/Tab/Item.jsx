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
    border:'soild 1px rgba(221,221,221,0.7)',
  },
  a: {
    position:'relative',
    display:'block',
    padding:'10px 15px',
    borderRadius:'4px 4px 0 0',
    marginRight:'2px',
    backgroundColor:'rgba(221,221,221,0.0)',
  },

});

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li classname='' style={styles.li}>
        <a href='#/user/dashboard' role='button' style={styles.a.negative}>{this.props.title}</a>
      </li>
    );
  }
}

Item.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default Radium(Item);
