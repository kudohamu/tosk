import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Router from 'react-router';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import Sidebar from './components/Sidebar/Sidebar';
import { HEADER_HEIGHT } from '../styles/Header/GlobalStyles';

const RouteHandler = Router.RouteHandler;

var styles = Vendor.prefix({
  container: {
    display:'flex',
    width:'100%',
    height:'100%',
    paddingTop:HEADER_HEIGHT,
  },
  sidebar: {
    width:'150px',
    flexFlow:'row nowrap',
    backgroundColor:'#2f2f2f',
  },
  content: {
    width:'100%',
    flexFlow:'row nowrap',
    backgroundColor:'rgba(255,255,255,0.6)',
  }
});

class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      boardId: this.context.router.getCurrentParams().boardId,
    }
  }

  render() {
    return(
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <Sidebar boardId={this.state.boardId} />
        </div>
        <div style={styles.content}>
          <RouteHandler />
        </div>
      </div>
    );
  }
}

Dashboard.contextTypes = {
    router: React.PropTypes.func.isRequired
};

ReactMixin(Dashboard.prototype, [Router.State]);

export default Radium(Dashboard);
