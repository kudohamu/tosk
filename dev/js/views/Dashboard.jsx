import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import BoardStore from '../stores/BoardStore';
import TODOActionCreator from '../action_creators/TODOActionCreator';
import DashboardActionCreator from '../action_creators/DashboardActionCreator';

import TabHeader from './components/Tab/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { HEADER_HEIGHT } from '../styles/Header/GlobalStyles';

import Actives from './components/Actives';
import Templates from './components/Actives';
import Members from './components/Invite';
import Settings from './components/Settings';
import Logs from './components/Logs';
import Loading from './components/Loading';

var styles = Vendor.prefix({
  dashboard: {
    width:'100%',
    height:'100%',
  },
  loading: {
    div: {
      display:'flex',
      width:'100%',
      height:'100%',
    },
    img: {
      flexFlow:'row nowrap',
      alignItems:'center',
      margin:'0 auto',
    }
  },
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
  constructor(props) {
    super(props);
    this.state = {
      boardId: 0,
      tab: 'Actives',
      boards: [],
      boardsLoading: true,
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleTabPlus = this._handleTabPlus.bind(this);
    this._handleTabClick = this._handleTabClick.bind(this);
    this._handleSidebarClick = this._handleSidebarClick.bind(this);

    let fetchBoards = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          DashboardActionCreator.fetchBoards();
          resolve();
        }, 1000);
      });
    }

    fetchBoards().then(() => {
      this.setState({ boardsLoading: false });
    });
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

    if(this.state.boards.length != 0) {
      this.setState({
        boardId: this.state.boards[0].id,
      });
      TODOActionCreator.addActionListener(this.state.boardId);
      TODOActionCreator.getTODOs();
    }
  }

  _handleTabPlus(name) {
    DashboardActionCreator.createBoard(name);
  }

  _handleTabClick(boardId) {
    if(this.state.boardId != boardId) {
      TODOActionCreator.addActionListener(boardId);
      TODOActionCreator.getTODOs();
    }
    this.setState({ boardId: boardId });
  }

  _handleSidebarClick(tab) {
    this.setState({ tab: tab });
  }

  render() {
    return(
      this.state.boardsLoading ?
      <Loading />
      :
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <Sidebar boardId={this.state.boardId} current={this.state.tab} handleSidebarClick={this._handleSidebarClick} />
        </div>
        <div style={styles.content}>
          <div style={styles.tab_area}>
            <TabHeader boardId={this.state.boardId} items={this.state.boards} handleTabPlus={this._handleTabPlus} handleTabClick={this._handleTabClick} />
            <div style={styles.tab_body}>
              {
                (() => {
                  switch(this.state.tab) {
                    case 'Actives':
                      return (<Actives boardId={this.state.boardId} />);
                    case 'Templates':
                      return (<Actives />);
                    case 'Members':
                      return (<Members />);
                    case 'Settings':
                      return (<Settings />);
                    case 'Logs':
                      return (<Logs />);
                  }
                })()
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Dashboard);
