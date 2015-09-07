import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import BoardAPIUtils from '../utils/BoardAPIUtils';
import NotificationActionCreator from './NotificationActionCreator';
import TODOActionCreator from './TODOActionCreator';

const DashboardActionCreator = {
  changeCurrentBoard: (boardId) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.BOARDS.CHANGE_CURRENT,
      boardId: boardId,
    });
  },

  getBoards: () => {
    BoardAPIUtils.index();
  },

  getBoardsSuccess: (boards) => {
    boards.map((board) => {
      DashboardActionCreator.addActionListener(board.id);
    });

    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.INDEX.SUCCESS_RESPONSE,
      boards: boards
    });
  },

  addActionListener: (boardId) => {
    BoardAPIUtils.join(boardId);

    //各イベントハンドラの設定
    BoardAPIUtils.on(boardId, "index", (payload) => {
      DashboardActionCreator.getBoardsSuccess(payload["boards"]);
    });

    BoardAPIUtils.on(boardId, "created", (payload) => {
      DashboardActionCreator.createBoardSuccess(payload["board"]);
    });

    BoardAPIUtils.on(boardId, "updated", (payload) => {
      DashboardActionCreator.updateBoardSuccess(payload["board"]);
      NotificationActionCreator.pushInfo('ボード名が変更されました。');
    });

    BoardAPIUtils.on(boardId, "deleted", (payload) => {
      DashboardActionCreator.deleteBoardSuccess(payload["id"]);
      NotificationActionCreator.pushInfo('ボードが削除されました。');
    });

    TODOActionCreator.addActionListener(boardId);
  },

  removeActionListener: (boardId) => {
    BoardAPIUtils.off(boardId, 'index');
    BoardAPIUtils.off(boardId, 'created');
    BoardAPIUtils.off(boardId, 'updated');
    BoardAPIUtils.off(boardId, 'deleted');

    TODOActionCreator.removeActionListener(boardId);

    BoardAPIUtils.leave(boardId);
  },

  createBoard: (name) => {
    BoardAPIUtils.create(name);
  },

  createBoardSuccess: (board) => {
    DashboardActionCreator.addActionListener(board.id);

    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.CREATE.SUCCESS_RESPONSE,
      board: board
    });
    NotificationActionCreator.pushSuccess('ボードを作成しました。');
  },

  updateBoard: (boardId, name) => {
    BoardAPIUtils.push(boardId, 'update', {
      name: name,
    });
  },

  updateBoardSuccess: (board) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.UPDATE.SUCCESS_RESPONSE,
      board: board
    });
  },

  deleteBoard: (boardId) => {
    BoardAPIUtils.push(boardId, "delete", {});
  },

  deleteBoardSuccess: (id) => {
    DashboardActionCreator.removeActionListener(id);

    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.DELETE.SUCCESS_RESPONSE,
      id: id
    });
  },

};

export default DashboardActionCreator;
