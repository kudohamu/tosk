import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { ProgressBar, Glyphicon } from 'react-bootstrap';

import EditableFolder from './EditableFolder';
import EditableTODO from './EditableTODO';
import PlusView from './PlusView';

var styles = Vendor.prefix({
});

class EditableList extends React.Component {

  render() {
    return (
      <div>
        {this.props.todos.map(function(todo) {
          if (todo.children.length == 0) {
            return (
              <div>
                <EditableTODO id={todo.id} content={todo.content} handleSubmit={this.props.changeContent} handlePlus={this.props.changeIntoFolder} handleMovingTODOStart={this.props.handleMovingTODOStart} handleMovingTODOEnter={this.props.handleMovingTODOEnter} handleTrash={this.props.handleTODODelete} />
              </div>
            );
          }else {
            var list = todo.open ? <EditableList folderID={todo.id} todos={todo.children} handleClickFolder={this.props.handleClickFolder} changeContent={this.props.changeContent} handleMovingTODOStart={this.props.handleMovingTODOStart} handleMovingTODOEnter={this.props.handleMovingTODOEnter} handleTODOPlus={this.props.handleTODOPlus} handleTODODelete={this.props.handleTODODelete} changeIntoFolder={this.props.changeIntoFolder} /> : '';
            return(
              <div>
                <EditableFolder id={todo.id} title={todo.content} open={todo.open} handleClickFolder={this.props.handleClickFolder} handleSubmit={this.props.changeContent} handleMovingTODOStart={this.props.handleMovingTODOStart} handleMovingTODOEnter={this.props.handleMovingTODOEnter} handleTrash={this.props.handleTODODelete} />
                <div key={todo.id}>
                  {list}
                </div>
              </div>
            );
          }
        }, this)}
        <PlusView folderID={this.props.folderID} handleTODOPlus={this.props.handleTODOPlus} />
      </div>
    );
  }
}

EditableList.propTypes = {
  folderID: React.PropTypes.number.isRequired,
  todos: React.PropTypes.array.isRequired,
  handleClickFolder: React.PropTypes.func.isRequired,
  changeContent: React.PropTypes.func.isRequired,
  handleMovingTODOStart: React.PropTypes.func.isRequired,
  handleMovingTODOEnter: React.PropTypes.func.isRequired,
  handleTODOPlus: React.PropTypes.func.isRequired,
  handleTODODelete: React.PropTypes.func.isRequired,
  changeIntoFolder: React.PropTypes.func.isRequired,
};

export default Radium(EditableList);
