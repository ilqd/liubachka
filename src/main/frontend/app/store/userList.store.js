import { List, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const userListReducer = (state = List(), action) => {
    switch (action.type) {
        case 'USERS_LOADED':
            return fromJS(action.data);
        case 'LOGOUT':
            return List();
        default:
            return state;
    }
};

export const loadData = (dispatch) =>{
    dispatch({ type: 'USERS_LOADING' });
    RestAPI.get('/api/users/list').then((data)=>
        dispatch({ type: 'USERS_LOADED', data}))
      .catch((data)=>
        dispatch({ type: 'USERS_LOADING_FAILED', data})
      );
};
