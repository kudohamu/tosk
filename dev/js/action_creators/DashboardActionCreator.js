import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import BoardAPIUtils from '../utils/BoardAPIUtils';

const DashboardActionCreator = {
  fetchBoards: () => {
    BoardAPIUtils.index();
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
