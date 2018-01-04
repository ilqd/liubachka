import { List, fromJS } from 'immutable';
import {commonLoadData} from './commonFunctions';

export const adminCardCreatorListReducer = (state = List(), action) => {
    switch (action.type) {
        case 'ADMIN_CARD_LIST_LOADED':
            return fromJS(action.data);
        case 'LOGOUT':
            return List();
        default:
            return state;
    }
};

export const loadData = (dispatch) =>  commonLoadData(dispatch, '/api/cards/folder',
      'ADMIN_CARD_LIST_LOADING', 'ADMIN_CARD_LIST_LOADED', 'ADMIN_CARD_LIST_LOADING_FAILED');
