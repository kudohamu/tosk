import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';
import TODOPane from './TODO/Pane';

import {Socket} from 'libphoenix';

var styles = Vendor.prefix({
});

class Actives extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    var socket = new Socket('ws://localhost:4000/ws/');
    socket.connect();

    this._chan = socket.chan("todos:lobby", {});

    this._chan.join().receive("ok", chan => {
      console.log("Welcome to Phoenix Chat!")
    })

    this._chan.on("shout", (payload) => {
      console.log(payload.body);
    })

    this.sendTODO = this.sendTODO.bind(this);
  }

  sendTODO() {
    this._chan.push("change", {body: "hoge"})
  }

  render() {
    return (
      <div>
        <TODOPane id={0} />
      </div>
    );
  }
}

export default Radium(Actives);
