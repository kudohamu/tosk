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
  },

  getTODOs: () => {
    setTimeout(() => {
      TODOAPIUtils.push("index", {});
    }, 100);
  },

  getTODOsSuccess: (todos) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.TODOS.INDEX.SUCCESS_RESPONSE,
      todos: todos
    });
  },

  createTODO: (boardId, title) => {
    setTimeout(() => {
      TODOAPIUtils.push("create", {
        boardId: boardId,
        title: title,
      });
    }, 100);
  }
};

export default TODOActionCreator;
