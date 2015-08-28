import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import BoardAPIUtils from '../utils/BoardAPIUtils';

const DashboardActionCreator = {
  changeCurrentBoard: (boardId) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.BOARDS.CHANGE_CURRENT,
      boardId: boardId,
    });
  },
  getBoardsSuccess: (data) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.INDEX.SUCCESS_RESPONSE,
      data: data
    });
  },
  addActionListener: () => {
    BoardAPIUtils.join();

    //各subscriberの設定
    BoardAPIUtils.on("index", (payload) => {
      DashboardActionCreator.getBoardsSuccess(payload["boards"]);
    });

    BoardAPIUtils.on("created", (payload) => {
      DashboardActionCreator.createBoardSuccess(payload["board"]);
    });

    BoardAPIUtils.on("deleted", (payload) => {
      DashboardActionCreator.deleteBoardSuccess(payload["id"]);
    });
  },

  removeActionListener: () => {
    DashboardAPIUtils.off('index');
    DashboardAPIUtils.off('created');
    DashboardAPIUtils.off('deleted');

    DashboardAPIUtils.leave();
  },

  getBoards: () => {
    BoardAPIUtils.push("index", {});
  },

  getBoardsSuccess: (boards) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.INDEX.SUCCESS_RESPONSE,
      boards: boards
    });
  },

  createBoard: (name) => {
    BoardAPIUtils.push("create", {
      name: name,
    });
  },

  createBoardSuccess: (board) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.CREATE.SUCCESS_RESPONSE,
      board: board
    });
  },

  deleteBoard: (id) => {
    BoardAPIUtils.push("delete", {
      id: id,
    });
  },

  deleteBoardSuccess: (id) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.DELETE.SUCCESS_RESPONSE,
      id: id
    });
  },

};

export default DashboardActionCreator;
