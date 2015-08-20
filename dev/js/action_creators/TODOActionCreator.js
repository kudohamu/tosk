import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

import TODOAPIUtils from '../utils/TODOAPIUtils';

const TODOActionCreator = {
  addActionListener: (boardId) => {
    TODOAPIUtils.join(boardId);

    TODOAPIUtils.on("index", (payload) => {
      TODOActionCreator.getTODOsSuccess(payload["data"]);
    });

    TODOAPIUtils.on('created', (payload) => {
      console.log(payload['todo']);
      TODOActionCreator.createTODOSuccess(payload['todo']);
    });

    TODOAPIUtils.on('deleted', (payload) => {
      TODOActionCreator.deleteTODOSuccess(payload['id']);
    });
  },

  getTODOs: () => {
    TODOAPIUtils.push("index", {});
  },

  getTODOsSuccess: (todos) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.TODOS.INDEX.SUCCESS_RESPONSE,
      todos: todos
    });
  },

  createTODO: (boardId, title) => {
    TODOAPIUtils.push("create", {
      boardId: boardId,
      title: title,
    });
  },

  createTODOSuccess: (todo) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.TODOS.CREATE.SUCCESS_RESPONSE,
      todo: todo
    });
  },

  deleteTODO: (boardId, id) => {
    TODOAPIUtils.push("delete", {
      boardId: boardId,
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
    TODOAPIUtils.push("change", {
      boardId: boardId,
      todo: todo,
    });
  },
};

export default TODOActionCreator;
