import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

const DashboardActionCreator = {
  hoge: (data) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.HOGE,
      data: data
    });
  }
};

export default DashboardActionCreator;
