import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

const DashboardActionCreator = {
  getBoardsSuccess: (data) => {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.BOARDS.INDEX.SUCCESS_RESPONSE,
      data: data
    });
  },
};

export default DashboardActionCreator;
