/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { List, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const pageListReducer = (state = List(), action) => {
    switch (action.type) {
        case 'PAGES_LOADED':
            return fromJS(action.data);
        case 'LOGOUT':
            return List();
        default:
            return state;
    }
};

export const loadPages = (dispatch) =>{
    dispatch({ type: 'LOADING_PAGES' });
    RestAPI.get('/api/page/listPages').then((data)=>
        dispatch({ type: 'PAGES_LOADED', data}))
      .catch((data)=>
        dispatch({ type: 'FAILED_LOADING_PAGES', data})
      );
};
