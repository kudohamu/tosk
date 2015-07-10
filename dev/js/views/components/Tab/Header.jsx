import React from 'react';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import Item from './Item';
import Plus from './Plus';

let styles = Vendor.prefix({
  container: {
    width:'100%',
    height:'42px',
    overflowX:'scroll',
    backgroundColor:'rgba(255,255,255,0.01)',
  },
  ul: {
    maxWidth:'10000px',
    height:'42px',
    borderBottomColor:'rgb(221, 221, 221)',
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.container}>
        <ul className='nav nav-tabs' style={styles.ul}>
          {
            this.props.items.map((item) => {
              return (
                <Item title={item.title} />
              );
            })
          }
          <Plus handleTabPlus={this.props.handleTabPlus} />
        </ul>
      </div>
    );
  }
}

Header.propTypes = {
  items: React.PropTypes.array.isRequired,
  handleTabPlus: React.PropTypes.func.isRequired,
};

export default Radium(Header);
