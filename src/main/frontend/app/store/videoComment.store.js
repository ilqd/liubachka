import { Map, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';
import {SUCCESS_MESSAGE} from './net.store';
export const videoCommentReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'COMMENTS_LIST_LOADED':
            return state.set(action.videoId, fromJS(action.data));
        case 'COMMENT_CHANGED':
            return state.set('new', action.value);
        case 'COMMENTS_LIST_LOADING':
        case 'COMMENT_POSTED':
            return state.delete('new');
        case 'LOGOUT':
            return Map();
        default:
            return state;
    }
};

export const loadComments = (dispatch, videoId) =>{
    dispatch({ type: 'COMMENTS_LIST_LOADING' });
    RestAPI.get(`/api/video/comments/${videoId}`).then((data)=>
        dispatch({ type: 'COMMENTS_LIST_LOADED', data, videoId}))
      .catch((data)=>
        dispatch({ type: 'COMMENTS_LIST_LOADING_FAILED', data})
      );
};
export const typeComment = (dispatch, value) =>{
    dispatch({ type: 'COMMENT_CHANGED', value });
};
export const addComment = (dispatch,  value) =>{
    dispatch({ type: 'POSTING_COMMENT' });
    dispatch({ type: 'POSTING' });
    RestAPI.post('/api/video/comments', value).then((response)=>{
        dispatch({ type: 'COMMENT_POSTED', response});
        dispatch({ type: 'POSTED', message: SUCCESS_MESSAGE });
    })
  .catch((response)=>{
      dispatch({ type: 'COMMENT_POST_FAILED', response});
      let message = 'Ошибка! :(';
      if (response.message) {
          message = `Ошибка! :( Сервер жалуется на это:   ${response.message}.`;
      }
      dispatch({ type: 'POSTED', message });
  }
  );
};
