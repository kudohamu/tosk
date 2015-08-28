import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import DashboardActionCreator from '../action_creators/DashboardActionCreator';
import APIUtils from './APIUtils';
import BoardAPIUtils from './BoardAPIUtils';
import ChannelStore from '../stores/ChannelStore';
import UserStore from '../stores/UserStore';

const CHANNEL_NAME = 'board';

export default {
  index: () => {
    APIUtils.authGet(
      'boards',
      (res) => {
        if(res["body"]["result"] == "ok") {
          DashboardActionCreator.getBoardsSuccess(res["body"]["boards"]);
        }else {
        
        }
      }
    );
  },
  create: (name) => {
    APIUtils.authPost(
      'boards',
      {
        board: {name: name}
      },
      (res) => {
        if (res["body"]["result"] == "ok") {
          DashboardActionCreator.createBoardsSuccess(res["body"]["boards"]);
        }else {
        }
      }
    );
  },
  delete: (boardId) => {
    APIUtils.authDelete(
      `boards/${boardId}`,
      {},
      (res) => {
        if (res["body"]["result"] == "ok") {
          DashboardActionCreator.deleteBoardsSuccess(res["body"]["boards"]);
        }else {
        }
      }
    );
  },

  join: () => {
    const topic = `boards:${UserStore.getAuthData().id}`;
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
