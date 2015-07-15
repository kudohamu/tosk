import request from 'superagent';
import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/Dispatcher';
import DashboardActionCreator from '../action_creators/DashboardActionCreator';
import APIUtils from './APIUtils';
import BoardAPIUtils from './BoardAPIUtils';

export default {
  index: (category) => {
    APIUtils.authGet(
      `boards?category=${category}`,
      (res) => {
        if(res["body"]["result"] == "ok") {
          DashboardActionCreator.getBoardsSuccess(res["body"]["boards"]);
        }else {
        
        }
      }
    );
  },
  create: (name, category) => {
    APIUtils.authPost(
      'boards',
      {
        board: { name: name, category: category}
      },
      (res) => {
        if (res["body"]["result"] == "ok") {
          BoardAPIUtils.index(category);
        }else {
        }
      }
    );
  },
  delete: (boardId) => {
    APIUtils.authPost(
      `boards/${boardId}`,
      (res) => {
        if (res["body"]["result"] == "ok") {
          BoardAPIUtils.index();
        }else {
        }
      }
    );
  },
}
