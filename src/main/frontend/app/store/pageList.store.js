/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { List, fromJS } from 'immutable';
import {commonLoadData} from './commonFunctions';

export const pageListReducer = (state = new List(), action) => {
    switch (action.type) {
        case 'PAGES_LOADED':
            return fromJS(action.data);
        case 'LOGOUT':
            return new List();
        default:
            return state;
    }
};

export const loadPages = (dispatch) =>  commonLoadData(dispatch, '/api/page/listPages',
          'LOADING_PAGES', 'PAGES_LOADED', 'FAILED_LOADING_PAGES');
