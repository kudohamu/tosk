import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

var styles = Vendor.prefix({
  container: {
    display:'flex',
    width:'100%',
    height:'100%',
  },
  img: {
    flexFlow:'row nowrap',
    alignItems:'center',
    margin:'0 auto',
  }
});

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.container}>
        <img src='../images/loading.svg' style={styles.img} />
      </div>
    );
  }
}

Loading.propTypes = {
};

export default Radium(Loading);
