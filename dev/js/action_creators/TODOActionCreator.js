import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

import BoardAPIUtils from '../utils/BoardAPIUtils';

const TODOActionCreator = {
  addActionListener: (boardId) => {
    //各イベントハンドラの設定
    BoardAPIUtils.on(boardId, 'todo:index', (payload) => {
      TODOActionCreator.getTODOsSuccess(payload['todos']);
    });

    BoardAPIUtils.on(boardId, 'todo:created', (payload) => {
      TODOActionCreator.createTODOSuccess(payload['todo']);
    });

    BoardAPIUtils.on(boardId, 'todo:deleted', (payload) => {
      TODOActionCreator.deleteTODOSuccess(payload['id']);
    });
    
    BoardAPIUtils.on(boardId, 'todo:changed', (payload) => {
      TODOActionCreator.changeTODOSuccess(payload['todo']);
    });
  },

  removeActionListener: (boardId) => {
    BoardAPIUtils.off(boardId, 'todo:index');
    BoardAPIUtils.off(boardId, 'todo:created');
    BoardAPIUtils.off(boardId, 'todo:deleted');
    BoardAPIUtils.off(boardId, 'todo:changed');

    BoardAPIUtils.leave(boardId);
  },

  openTODOFolder: (todo) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.TODOS.OPEN_FOLDER,
      todo: todo,
    });
  },

  getTODOs: (boardId, active = true) => {
    BoardAPIUtils.push(boardId, 'todo:index', {
      active: active,
    });
  },

  getTODOsSuccess: (todos) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.TODOS.INDEX.SUCCESS_RESPONSE,
      todos: todos
    });
  },

  createTODO: (boardId, title, active) => {
    BoardAPIUtils.push(boardId, 'todo:create', {
      title: title,
      active: active,
    });
  },

  createTODOSuccess: (todo) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.TODOS.CREATE.SUCCESS_RESPONSE,
      todo: todo
    });
  },

  deleteTODO: (boardId, id) => {
    BoardAPIUtils.push(boardId, 'todo:delete', {
      id: id,
    });
  },

  deleteTODOSuccess: (id) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.TODOS.DELETE.SUCCESS_RESPONSE,
      id: id,
    });
  },

  changeTODO: (boardId, todo) => {
    BoardAPIUtils.push(boardId, 'todo:change', {
      todo: todo,
    });
  },

  changeTODOSuccess: (todo) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.TODOS.CHANGE.SUCCESS_RESPONSE,
      todo: todo,
    });
  },

  clearTODOs: () => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.TODOS.CLEAR,
    });
  },

  //テンプレートTODOをアクティブ化する
  activateTemplate: (boardId, template) => {
    BoardAPIUtils.push(boardId, 'todo:create', {
      title: template.content,
      active: true,
      children: template.children,
    });
  },
};

export default TODOActionCreator;
