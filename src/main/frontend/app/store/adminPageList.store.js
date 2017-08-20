/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { Map, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const pageListReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'PAGES_LOADED':
            return fromJS(action.data);
        case 'LOGOUT':
            return Map();
        default:
            return state;
    }
};

export const loadPages = (dispatch) =>{
    dispatch({ type: 'LOADING_PAGES' });
    RestAPI.get('/api/pages/listPages').then((data)=>
        dispatch({ type: 'PAGES_LOADED', data}))
      .catch((data)=>
        dispatch({ type: 'FAILED_LOADING_PAGES', data})
      );
};
