import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import Constants from '../../../constants/constants';

var styles = Vendor.prefix({
  container: {
    flexFlow:'row nowrap',
    height:'30px',
    padding:'0px 30px',
    borderRight:'solid 1px rgba(255,255,255,.3)',
  },
  p: {
    fontSize:'14px',
    fontWeight:'bold',
    color:'#99ff00',
    textAlign:'center',
    margin:'0',
    lineHeight:'1.2',
    padding:'6px 0px',
  }
});

class Title extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={styles.container} onClick={this._handleClick}>
        <p style={styles.p}>{Constants.TITLE}</p>
      </div>
    );
  }
}

Title.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleClick: React.PropTypes.func.isRequired,
  current: React.PropTypes.bool.isRequired,
};

export default Radium(Title);
