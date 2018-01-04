import { List, fromJS } from 'immutable';
import {commonLoadData} from './commonFunctions';

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

export const loadData = (dispatch) =>  commonLoadData(dispatch, '/api/users/list',
                'USERS_LOADING', 'USERS_LOADED', 'USERS_LOADING_FAILED');
