import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

var styles = Vendor.prefix({
  container: {
    backgroundColor:"rgba(255,255,255,0.6)",
    width:"100%",
    height:"100%"
  },
});

class Actives extends React.Component {
  render() {
    return (
      <div style={styles.container}>
      </div>
    );
  }
}

export default Radium(Actives);
