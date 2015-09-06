import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

const NotificationActionCreator = {
  push: (content) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NOTIFICATIONS.PUSH,
      content: content
    });
  },
  erase: (id) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NOTIFICATIONS.ERASE,
      id: id
    });
  },
};

export default NotificationActionCreator;
