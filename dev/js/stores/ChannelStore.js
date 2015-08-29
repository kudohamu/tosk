import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

import {Socket} from 'libphoenix';

import  UserStore from './UserStore';

const ActionTypes = Constants.ActionTypes;
const CHANGE_EVENT = 'change';

var _socket = {};
var _chan = {};
var _currentTopic = {};

class ChannelStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  connect() {
    _socket = new Socket('ws://localhost:4000/ws/');
    _socket.connect();
  }

  setChan(name, topic) {
    const auth = UserStore.getAuthData();
    _chan[name] = _socket.chan(topic, { id : auth.id, token: auth.token });
  }

  getChan(name) {
    return _chan[name];
  }

  registerTopic(name, topic) {
    _currentTopic[name] = topic;
  }

  readTopic(name) {
    return _currentTopic[name];
  }
}

let _ChannelStore = new ChannelStore();

export default _ChannelStore;

AppDispatcher.register((payload) => {
  const action = payload.action;

  switch(action.type) {
    case ActionTypes.Hoge:
      _ChannelStore.emitChange();
      break;
  }
});
