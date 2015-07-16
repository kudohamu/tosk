import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Router from 'react-router';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import BoardStore from '../stores/BoardStore';
import BoardAPIUtils from '../utils/BoardAPIUtils';

import TabHeader from './components/Tab/Header';
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
  },
  tab_area: {
    width:"100%",
    height:"100%"
  },
  tab_body: {
    width:"100%",
    height:"100%",
    padding:"5px",
  },
});

class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      boardId: this.context.router.getCurrentParams().boardId,
      path: 'actives',
      boards: BoardStore.getBoards(),
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleTabPlus = this._handleTabPlus.bind(this);
    this._handleTabClick = this._handleTabClick.bind(this);
    this._handleSidebarClick = this._handleSidebarClick.bind(this);
  }

  componentDidMount() {
    BoardStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    BoardStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({ 
      boards: BoardStore.getBoards(),
    });
  }

  _handleTabPlus(name) {
    BoardAPIUtils.create(name);
  }

  _handleTabClick(boardId) {
    this.setState({ boardId: boardId });
  }

  _handleSidebarClick(path) {
    this.setState({ path: path });
  }

  render() {
    return(
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <Sidebar boardId={this.state.boardId} handleSidebarClick={this._handleSidebarClick} />
        </div>
        <div style={styles.content}>
          <div style={styles.tab_area}>
            <TabHeader items={this.state.boards} path={this.state.path} handleTabPlus={this._handleTabPlus} handleTabClick={this._handleTabClick} />
            <div style={styles.tab_body}>
              <RouteHandler />
            </div>
          </div>
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
