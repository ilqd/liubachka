import { Map, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const videoCommentReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'COMMENTS_LIST_LOADED':
            return state.set(action.videoId, fromJS(action.data));
        case 'COMMENT_CHANGED':
            return state.setIn(['reply', 'text'], action.value);
        case 'COMMENTS_LIST_LOADING':
        case 'COMMENT_POSTED':
        case 'COMMENT_CLEARED':
            return state.delete('reply');
        case 'COMMENT_REPLY_OPENED':
            if (state.getIn(['reply', 'parent']) == action.commentId) {
                return state.delete('reply');
            }
            return state.delete('reply').setIn(['reply', 'parent'], action.commentId);
        case 'COMMENT_CREATE_OPENED':
            if (state.getIn(['reply', 'video']) == action.videoId) {
                return state.delete('reply');
            }
            return state.delete('reply').setIn(['reply', 'video'], action.videoId);
        case 'LOGOUT':
            return Map();
        default:
            return state;
    }
};

export const reply = (dispatch, commentId) =>{
    dispatch({ type: 'COMMENT_REPLY_OPENED', commentId });
};
export const create = (dispatch, videoId) =>{
    dispatch({ type: 'COMMENT_CREATE_OPENED', videoId });
};
export const clear = (dispatch) =>{
    dispatch({ type: 'COMMENT_CLEARED' });
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
        dispatch({ type: 'POSTED' });
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
