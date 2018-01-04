/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { Map, fromJS } from 'immutable';
import {commonLoadData} from './commonFunctions';

export const skilltestQuestionsReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'TEST_DATA_LOADED':
            return fromJS(action.data);
        default:
            return state;
    }
};
export const loadData = (dispatch, data) =>
dispatch({ type: 'TEST_DATA_LOADED', data });

export const loadTestTypeData = (dispatch, type)=> commonLoadData(dispatch, `/api/tests/getAssigned/${type}`,
         'LOADING_TEST_DATA', 'TEST_DATA_LOADED', 'TEST_DATA_LOADING_FAILED');
