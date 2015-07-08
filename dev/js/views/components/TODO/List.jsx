import React from 'react/addons';
import Radium from 'radium';
import Vendor from 'react-vendor-prefix';

import { ProgressBar, Glyphicon } from 'react-bootstrap';

import ListHeader from './ListHeader';
import TODO from './CheckableTODO';

var styles = Vendor.prefix({
});

class List extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.todos.map((todo) => {
            if (todo.children.length == 0) {
              return (
                <TODO checkable={this.props.checkable} id={todo.id} content={todo.content} checked={todo.checked} handleCheck={this.props.handleCheck} />
              );
            }else {
              var list = todo.open ? <List checkable={this.props.checkable} todos={todo.children} handleCheck={this.props.handleCheck} handleClickFolder={this.props.handleClickFolder} calculateProgress={this.props.calculateProgress} /> : '';
              return(
                <div>
                  <ListHeader checkable={this.props.checkable} id={todo.id} title={todo.content} progress={this.props.calculateProgress(todo)} open={todo.open} handleClickFolder={this.props.handleClickFolder} />
                  <div key={todo.id}>
                    {list}
                  </div>
                </div>
              );
            }
          })
        }
      </div>
    );
  }
}

List.propTypes = {
  checkable: React.PropTypes.bool,
  todos: React.PropTypes.array.isRequired,
  handleCheck: React.PropTypes.func.isRequired,
  handleClickFolder: React.PropTypes.func.isRequired,
  calculateProgress: React.PropTypes.func.isRequired,
};

export default Radium(List);
