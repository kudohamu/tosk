import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

const PageActionCreator = {
  setPage: (page) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.PAGE.CHANGE,
      page: page
    });
  },
};

export default PageActionCreator;
