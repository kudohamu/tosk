import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

var styles = Vendor.prefix({
});

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Settings</h1>
      </div>
    );
  }
}

Settings.propTypes = {
};

export default Radium(Settings);
