import { List, fromJS } from 'immutable';
import {commonLoadData} from './commonFunctions';

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

export const loadUsers = (dispatch) =>  commonLoadData(dispatch, '/api/users',
       'ADMIN_USERS_LOADING', 'ADMIN_USERS_LOADED', 'ADMIN_USERS_LOADING_FAILED');
