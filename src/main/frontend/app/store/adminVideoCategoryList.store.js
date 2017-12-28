import { List, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const adminVideoCategoryListReducer = (state = List(), action) => {
    switch (action.type) {
        case 'VIDEO_CATEGORIES_LOADED':
            return fromJS(action.data);
        case 'LOGOUT':
            return List();
        default:
            return state;
    }
};

export const loadData = (dispatch) =>{
    dispatch({ type: 'VIDEO_CATEGORIES_LOADING' });
    RestAPI.get('/api/videoCategory').then((data)=>
        dispatch({ type: 'VIDEO_CATEGORIES_LOADED', data}))
      .catch((data)=>
        dispatch({ type: 'VIDEO_CATEGORIES_LOADING_FAILED', data})
      );
};
