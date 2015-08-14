import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

import TODOAPIUtils from '../utils/TODOAPIUtils';

const TODOActionCreator = {
  getTODOs: (boardId) => {
    TODOAPIUtils.join(boardId);
    setTimeout(() => {
      TODOAPIUtils.on("index", (payload) => {
        console.log(payload["data"]);
        TODOActionCreator.getTODOsSuccess(payload["data"]);
      });
      TODOAPIUtils.push("index", {});
    }, 1000);
  },

  getTODOsSuccess: (todos) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.TODOS.INDEX.SUCCESS_RESPONSE,
      todos: todos
    });
  },
};

export default TODOActionCreator;
