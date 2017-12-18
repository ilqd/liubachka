import { List, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const videoListReducer = (state = List(), action) => {
    switch (action.type) {
        case 'VIDEO_LIST_LOADED':
            return fromJS(action.data);
        case 'LOGOUT':
            return List();
        default:
            return state;
    }
};

export const loadVideos = (dispatch) =>{
    dispatch({ type: 'VIDEO_LIST_LOADING' });
    RestAPI.get('/api/video/list').then((data)=>
        dispatch({ type: 'VIDEO_LIST_LOADED', data}))
      .catch((data)=>
        dispatch({ type: 'VIDEO_LIST_LOADING_FAILED', data})
      );
};
