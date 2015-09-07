import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

const NotificationActionCreator = {
  pushSuccess: (content) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NOTIFICATIONS.PUSH,
      category: Constants.NOTIFICATION.SUCCESS,
      content: content
    });
  },
  pushInfo: (content) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NOTIFICATIONS.PUSH,
      category: Constants.NOTIFICATION.INFO,
      content: content
    });
  },
  pushError: (content) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NOTIFICATIONS.PUSH,
      category: Constants.NOTIFICATION.ERROR,
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
