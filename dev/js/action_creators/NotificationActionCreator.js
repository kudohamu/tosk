import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';

const AUTO_ERASING_TIME = 3000;

const NotificationActionCreator = {
  pushSuccess: (content) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NOTIFICATIONS.PUSH,
      category: Constants.NOTIFICATION.SUCCESS,
      content: content
    });
    NotificationActionCreator.setAutoErasing();
  },
  pushInfo: (content) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NOTIFICATIONS.PUSH,
      category: Constants.NOTIFICATION.INFO,
      content: content
    });
    NotificationActionCreator.setAutoErasing();
  },
  pushError: (content) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NOTIFICATIONS.PUSH,
      category: Constants.NOTIFICATION.ERROR,
      content: content
    });
    NotificationActionCreator.setAutoErasing();
  },
  erase: (id) => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NOTIFICATIONS.ERASE,
      id: id
    });
  },
  setAutoErasing: () => {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.NOTIFICATIONS.SET_AUTO_ERASING,
      id: setTimeout(() => {
        NotificationActionCreator.erase();
      }, AUTO_ERASING_TIME),
    });
  },
};

export default NotificationActionCreator;
