import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import TODOPane from './TODO/Pane';

var styles = Vendor.prefix({
});

class Actives extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <TODOPane id={0} />
    );
  }
}

export default Radium(Actives);
