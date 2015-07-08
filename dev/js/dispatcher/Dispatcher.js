import { Dispatcher } from 'flux';
import Constants from '../constants/Constants';

let PayloadSources = Constants.PayloadSources;

class AppDispatcher extends Dispatcher {
  handleServerAction(action) {
    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action: action
    })
  }

  handleViewAction(action) {
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action
    })
  }
}

let _AppDispatcher = new AppDispatcher();

export default _AppDispatcher;
