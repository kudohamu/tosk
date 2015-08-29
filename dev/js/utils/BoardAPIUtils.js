import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import DashboardActionCreator from '../action_creators/DashboardActionCreator';
import APIUtils from './APIUtils';
import BoardAPIUtils from './BoardAPIUtils';
import ChannelStore from '../stores/ChannelStore';
import UserStore from '../stores/UserStore';

const channelName = (boardId) => { return `boards:${boardId}` };

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
          DashboardActionCreator.createBoardSuccess(res["body"]["board"]);
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

  join: (boardId) => {
    const topic = `boards:${boardId}`;
    ChannelStore.setChan(channelName(boardId), topic);
    ChannelStore.registerTopic(channelName(boardId), topic);

    ChannelStore.getChan(channelName(boardId)).join().receive("ok", chan => {
    });
  },

  leave: (boardId) => {
    ChannelStore.getChan(channelName(boardId)).leave().receive("ok", chan => {
    });
  },

  on: (boardId, message, callback) => {
    ChannelStore.getChan(channelName(boardId)).on(message, (payload) => {
      callback(payload);
    });
  },

  off: (boardId, message) => {
    ChannelStore.getChan(channelName(boardId)).off(message);
  },

  push: (boardId, message, payload) => {
    setTimeout(() => {
      ChannelStore.getChan(channelName(boardId)).push(message, payload);
    }, 100);
  }
}
