import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import TODOStore from '../../../stores/TODOStore';

import { ProgressBar, Glyphicon } from 'react-bootstrap';

import List from './List';
import EditableList from './EditableList';
import Menu from './Menu';
import MoveTODOQueue from './MoveTODOQueue';

var styles = Vendor.prefix({
  container: {
    display:"inline-block",
    verticalAlign: 'top',
  },
  pane: {
    position:"relative",
    backgroundColor:"rgba(0,0,0,0.2)",
    borderRadius:"6px 6px 0px 0px",
    width:"300px",
    border:"solid 1px rgba(44,44,44,0.2)",
    margin:"0",
  },
  header: {
    own: {
      position:"relative",
      width:"100%",
      textAlign:"center",
      backgroundColor:"#ffd8b2",
      padding:"10px 10px",
      borderRadius:"6px 6px 0px 0px",
    },
    p: {
      display:"inline",
      fontWeight:"bold",
      fontSize:"18px",
      color:"#5c5c5c",
      margin:"0",
    },
    menu: {
      position:"absolute",
      top:"12px",
      right:"3px",
      backgroundColor:"rgba(0,0,0,0)",
      border:"solid 0px rgba(0,0,0,0)",
      color:"gray",

      ':focus': {
        outline:'none',
      },

      ':hover': {
        color:'rgba(100,100,100,1)',
      }
    }
  },
  progress: {
    margin:"0",
    height:"4px",
  },
});

class Pane extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      checkable: true,
      todo: TODOStore.getTODO(this.props.id),
    };
    this.moveTODOQueue = new MoveTODOQueue();

    this.calculateProgress = this.calculateProgress.bind(this);
    this._handleCheck = this._handleCheck.bind(this);
    this._handleClickFolder = this._handleClickFolder.bind(this);
    this._changeContent = this._changeContent.bind(this);
    this._handleMenuToggle = this._handleMenuToggle.bind(this);
    this._handlePaneEdit = this._handlePaneEdit.bind(this);
    this._handlePaneDelete = this._handlePaneDelete.bind(this);
    this._handleMovingTODOStart = this._handleMovingTODOStart.bind(this);
    this._handleMovingTODOEnter = this._handleMovingTODOEnter.bind(this);
    this._handleTODOPlus = this._handleTODOPlus.bind(this);
    this._handleTODODelete = this._handleTODODelete.bind(this);
    this._changeIntoFolder = this._changeIntoFolder.bind(this);
  }

  calculateProgress(todo) {
    return todo.children.filter(function(todo) { return todo.checked == true; }).length * 100 / todo.children.length;
  }

  _handleCheck(id) {
    let checkTODO = (todo) => {
      return {
        id: todo.id,
        content: todo.content,
        checked: (id == todo.id) ? !todo.checked : todo.checked,
        open: todo.open,
        children: todo.children.map((todo) => {
          return checkTODO(todo);
        })
      };
    };
    let checkFolder = (todo) => {
    
    };
    let checkProgress = (todo) => {
      let children = todo.children.map((todo) => {
        if(todo.children.length == 0) {
          return todo;
        }else {
          return checkProgress(todo);
        }
      });
      return {
        id: todo.id,
        content: todo.content,
        open: todo.open,
        checked: children.reduce(function(acc, todo) {
          return acc && todo.checked;
        }, true),
        children: children,
      };
    };
    this.setState({ todo: checkProgress(checkTODO(this.state.todo)) });
  }

  _handleClickFolder(id) {
    let openFolder = (todo) => {
      if(id == todo.id) {
        return {
          id: todo.id,
          content: todo.content,
          checked: todo.checked,
          open: !todo.open,
          children: todo.children
        };
      }else {
        return {
          id: todo.id,
          content: todo.content,
          checked: todo.checked,
          open: todo.open,
          children: todo.children.map((todo) => {
            return openFolder(todo);
          })
        };
      }
    };
    this.setState({ todo: openFolder(this.state.todo) });
  }

  _changeContent(id, content) {
    let updateContent = (todo) => {
      if(id == todo.id) {
        return {
          id: todo.id,
          content: content,
          checked: todo.checked,
          open: todo.open,
          children: todo.children
        };
      }else {
        return {
          id: todo.id,
          content: todo.content,
          checked: todo.checked,
          open: todo.open,
          children: todo.children.map((todo) => {
            return updateContent(todo);
          })
        };
      }
    };
    this.setState({ todo: updateContent(this.state.todo) });
  }

  _handleMenuToggle() {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  _handlePaneEdit() {
    this.setState({checkable: !this.state.checkable});
  }

  _handlePaneDelete() {
    this.props.handlePaneDelete(this.props.id);
  }

  _handleMovingTODOStart(id) {
    this.moveTODOQueue.setMovingTODOid(id);
  }

  _handleMovingTODOEnter(id) {
    var exchangeTODO = {};
    if(id != this.moveTODOQueue.getMovingTODOid()) {
      var todos = this.state.todo.children.filter((todo) => {
        if (this.moveTODOQueue.getMovingTODOid() != todo.id) {
          return true;
        }else {
          exchangeTODO = todo;
          return false;
        }
      });
      var exchange = false;
      var todos = todos.map((todo) => {
        if(exchange) {
          let returnTODO = exchangeTODO;
          exchangeTODO = todo;
          return returnTODO;
        }else {
          if(id == todo.id) {
            exchange = true;
          }
          return todo;
        }
      });
      todos.push(exchangeTODO);
      this.setState({
        todo: {
          id: this.state.todo.id,
          content: this.state.todo.content,
          checked: this.state.todo.checked,
          children: todos,
        }
      });
    }
  }

  _handleTODOPlus(folderID, content) {
    let addTODO = (todo) => {
      if(folderID == todo.id) {
        return (
          {
            id: todo.id,
            content: todo.content,
            checked: todo.checked,
            open: todo.open,
            children: todo.children.concat([{
              id: Math.floor(Math.random() * 10000), //TODO サーバでランダムな値を設定
              content: content,
              checked: false,
              open: false,
              children: [],
            }])
          }
        );
      }else {
        return (
          {
            id: todo.id,
            content: todo.content,
            checked: todo.checked,
            open: todo.open,
            children: todo.children.map((todo) => {
              return addTODO(todo);
            })
          }
        );
      }
    };
    this.setState({ todo: addTODO(this.state.todo) });
  }

  _handleTODODelete(id) {
    let deleteTODO = (todo) => {
      return {
        id: todo.id,
        content: todo.content,
        checked: todo.checked,
        open: todo.open,
        children: todo.children.filter((todo) => {
          if(id == todo.id) {
            return false;
          }else {
            return true;
          }
        }).map((todo) => {
          return deleteTODO(todo);
        })
      };
    }
    this.setState({ todo: deleteTODO(this.state.todo) });
  }

  _changeIntoFolder(id) {
    this._handleClickFolder(id);
    this._handleTODOPlus(id, '');
  }

  render() {
    var list = this.state.checkable ? 
      <List todos={this.state.todo.children} handleCheck={this._handleCheck} handleClickFolder={this._handleClickFolder.bind(this)} calculateProgress={this.calculateProgress} /> : 
      <EditableList folderID={this.state.todo.id} todos={this.state.todo.children} handleClickFolder={this._handleClickFolder} changeContent={this._changeContent} handleMovingTODOStart={this._handleMovingTODOStart} handleMovingTODOEnter={this._handleMovingTODOEnter} handleTODOPlus={this._handleTODOPlus} handleTODODelete={this._handleTODODelete} changeIntoFolder={this._changeIntoFolder} />
    return (
      <div style={styles.container}>
        <div style={styles.pane}>
          <Menu open={this.state.showMenu} handleMenuToggle={this._handleMenuToggle.bind(this)} handlePaneEdit={this._handlePaneEdit.bind(this)} handlePaneDelete={this._handlePaneDelete} />
          <div style={styles.header.own}>
            <p style={styles.header.p}>{this.state.todo.content}</p>
            <button style={styles.header.menu} onClick={this._handleMenuToggle.bind(this)}><Glyphicon glyph="cog" /></button>
          </div>
          <ProgressBar bsStyle="success" style={styles.progress} now={this.calculateProgress(this.state.todo)} />
          {list}
        </div>
      </div>
    );
  }
}

Pane.propTypes = {
  id: React.PropTypes.number.isRequired,
  handlePaneDelete: React.PropTypes.func.isRequired,
};

export default Radium(Pane);
