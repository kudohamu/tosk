import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import APIUtils from './APIUtils';

import TODOStore from '../stores/TODOStore';
import ChannelStore from '../stores/ChannelStore';

export default {
  join: (boardId) => {
    ChannelStore.setChan(`todos:${boardId}`);

    ChannelStore.getChan().join().receive("ok", chan => {
    });
  },

  on: (message, callback) => {
    ChannelStore.getChan().on(message, (payload) => {
      callback(payload);
    });
  },

  push: (message, payload) => {
    setTimeout(() => {
      ChannelStore.getChan().push(message, payload);
    }, 100);
  }
}
