import { List, fromJS } from 'immutable';
import {commonLoadData} from './commonFunctions';

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

export const loadData = (dispatch) =>  commonLoadData(dispatch, '/api/videoCategory',
          'VIDEO_CATEGORIES_LOADING', 'VIDEO_CATEGORIES_LOADED', 'VIDEO_CATEGORIES_LOADING_FAILED');
