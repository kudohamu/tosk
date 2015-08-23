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
  fetchBoards: () => {
    BoardAPIUtils.index();
  },
  createBoard: (name) => {
    BoardAPIUtils.create(name);
  },
  getBoardsSuccess: (data) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.INDEX.SUCCESS_RESPONSE,
      data: data
    });
  },
  createBoardsSuccess: (data) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.CREATE.SUCCESS_RESPONSE,
      data: data
    });
  },
  deleteBoardsSuccess: (data) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.DELETE.SUCCESS_RESPONSE,
      data: data
    });
  },
};

export default DashboardActionCreator;
