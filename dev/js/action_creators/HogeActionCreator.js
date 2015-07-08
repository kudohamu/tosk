import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

const HogeActionCreator {
  hoge: (content) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.HOGE,
      content: content
    });
  }
};

export default HogeActionCreator;
