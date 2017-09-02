/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { List, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const adminPageListReducer = (state = List(), action) => {
    switch (action.type) {
        case 'ADMIN_PAGES_LOADED':
            return fromJS(action.data);
        case 'PAGE_SAVED': {
            const result = fromJS(action.result);
            const idx = state.findIndex(p=>p.get('id') == result.get('id'));
            if (idx >= -1) {
                return state.set(idx, result);
            }return state.push(result);
        }
        case 'LOGOUT':
            return List();
        default:
            return state;
    }
};

export const loadPages = (dispatch) =>{
    dispatch({ type: 'ADMIN_LOADING_PAGES' });
    RestAPI.get('/api/page/adminListPages').then((data)=>
        dispatch({ type: 'ADMIN_PAGES_LOADED', data}))
      .catch((data)=>
        dispatch({ type: 'ADMIN_FAILED_LOADING_PAGES', data})
      );
};
