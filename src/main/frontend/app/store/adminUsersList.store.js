import { List, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const adminUsersListReducer = (state = List(), action) => {
    switch (action.type) {
        case 'ADMIN_USERS_LOADED':
            return fromJS(action.data);
        case 'LOGOUT':
            return List();
        default:
            return state;
    }
};

export const loadUsers = (dispatch) =>{
    dispatch({ type: 'ADMIN_USERS_LOADING' });
    RestAPI.get('/api/users').then((data)=>
        dispatch({ type: 'ADMIN_USERS_LOADED', data}))
      .catch((data)=>
        dispatch({ type: 'ADMIN_USERS_LOADING_FAILED', data})
      );
};
