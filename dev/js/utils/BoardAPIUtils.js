import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import DashboardActionCreator from '../action_creators/DashboardActionCreator';
import APIUtils from './APIUtils';
import BoardAPIUtils from './BoardAPIUtils';

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
          DashboardActionCreator.getBoardsSuccess(res["body"]["boards"]);
        }else {
        }
      }
    );
  },
}
