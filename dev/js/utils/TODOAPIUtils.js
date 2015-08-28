import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import APIUtils from './APIUtils';

import TODOStore from '../stores/TODOStore';
import ChannelStore from '../stores/ChannelStore';

const CHANNEL_NAME = 'todo';

export default {
  join: (boardId) => {
    const topic = `todos:${boardId}`;
    ChannelStore.setChan(CHANNEL_NAME, topic);
    ChannelStore.registerTopic(CHANNEL_NAME, topic);

    ChannelStore.getChan(CHANNEL_NAME).join().receive("ok", chan => {
    });
  },

  leave: () => {
    ChannelStore.getChan(CHANNEL_NAME).leave().receive("ok", chan => {
    });
  },

  on: (message, callback) => {
    ChannelStore.getChan(CHANNEL_NAME).on(message, (payload) => {
      callback(payload);
    });
  },

  off: (message) => {
    ChannelStore.getChan(CHANNEL_NAME).off(message);
  },

  push: (message, payload) => {
    setTimeout(() => {
      ChannelStore.getChan(CHANNEL_NAME).push(message, payload);
    }, 100);
  }
}
