import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import BoardStore from '../stores/BoardStore';
import ChannelStore from '../stores/ChannelStore';
import TODOActionCreator from '../action_creators/TODOActionCreator';
import DashboardActionCreator from '../action_creators/DashboardActionCreator';

import TabHeader from './components/Tab/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { HEADER_HEIGHT } from '../styles/Header/GlobalStyles';

import SmallModal from './components/ConfirmationModal/SmallModal';
import Actives from './components/Actives';
import Templates from './components/Templates';
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
      currentBoard: BoardStore.getCurrentBoard(),
      tab: 'Actives',
      boards: BoardStore.getBoards(),
      boardsLoading: BoardStore.getBoardsLoading(),
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleTabPlus = this._handleTabPlus.bind(this);
    this._handleTabClick = this._handleTabClick.bind(this);
    this._handleSidebarClick = this._handleSidebarClick.bind(this);
    this._createBoard = this._createBoard.bind(this);

    DashboardActionCreator.getBoards();
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
      boardsLoading: BoardStore.getBoardsLoading(),
      currentBoard: BoardStore.getCurrentBoard(),
    });
  }

  _handleTabPlus(name) {
    DashboardActionCreator.createBoard(name);
  }

  _handleTabClick(boardId) {
    if(boardId != this.state.currentBoard.id) {
      DashboardActionCreator.changeCurrentBoard(boardId);
    }
  }

  _handleSidebarClick(tab) {
    this.setState({ tab: tab });
  }

  _createBoard() {
    let name = React.findDOMNode(this.refs.board_name).value;
    this._handleTabPlus(name);
  }

  render() {
    if (this.state.boardsLoading) {
      return (<Loading />);
    }else if (Object.keys(this.state.currentBoard).length == 0) {
      return (
        <SmallModal title='Board名を入力してください' handleSubmit={this._createBoard} onRequestHide={() => {}} cancelable={false} >
          <div className='form-group'>
            <input type='text' className='form-control input' placeholder='Board名' ref='board_name' />
          </div>
        </SmallModal>
      );
    }else {
      return (
        <div style={styles.container}>
          <div style={styles.sidebar}>
            <Sidebar boardId={this.state.currentBoard.id} current={this.state.tab} handleSidebarClick={this._handleSidebarClick} />
          </div>
          <div style={styles.content}>
            <div style={styles.tab_area}>
              <TabHeader boardId={this.state.currentBoard.id} items={this.state.boards} handleTabPlus={this._handleTabPlus} handleTabClick={this._handleTabClick} />
              <div style={styles.tab_body}>
                {
                  (() => {
                    switch(this.state.tab) {
                      case 'Actives':
                        return (<Actives boardId={this.state.currentBoard.id} />);
                      case 'Templates':
                        return (<Templates boardId={this.state.currentBoard.id} />);
                      case 'Members':
                        return (<Members />);
                      case 'Settings':
                        return (<Settings boardId={this.state.currentBoard.id} boardName={this.state.currentBoard.name} />);
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
}

export default Radium(Dashboard);
