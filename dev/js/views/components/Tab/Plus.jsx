import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { Button, Glyphicon } from 'react-bootstrap';

var styles = Vendor.prefix({
  li: {
    float:'left',
    display:'block',
    marginBottom:'-1px',
    position:'relative',
    height:'42px',
    border:'soild 1px rgba(221,221,221,0.7)',
  },
  button: {
    position:'relative',
    display:'block',
    padding:'10px 15px',
    borderRadius:'4px 4px 0 0',
    marginRight:'2px',
    backgroundColor:'rgba(221,221,221,0.0)',

    ':focus': {
      outline:'none',
    }
  },
});

class Plus extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li classname='' style={styles.li}>
        <Button style={styles.button} onClick={this.props.handleTabPlus}><Glyphicon glyph='plus' /></Button>
      </li>
    );
  }
}

Plus.propTypes = {
  handleTabPlus: React.PropTypes.func.isRequired,
};

export default Radium(Plus);
