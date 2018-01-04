/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { Map, fromJS } from 'immutable';
import {commonLoadData} from './commonFunctions';

export const adminTestResultsReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'TEST_RESULTS_LOADED':
            return state.set('list', fromJS(action.data));
        case 'VIEWING_RESULT':
            return state.set('inspect', fromJS(action.data));
        case 'STOP_VIEWING_RESULT':
            return state.delete('inspect');
        case 'LOGOUT':
            return Map();
        default:
            return state;
    }
};

export const loadResults = (dispatch) =>  commonLoadData(dispatch, '/api/results/listResults',
     'LOADING_TEST_RESULTS', 'TEST_RESULTS_LOADED', 'FAILED_LOADING_TEST_RESULTS');

export const inspectResult = (dispatch, data)=>{
    dispatch({ type: 'VIEWING_RESULT', data });
};
export const stopInspection = (dispatch) => {
    dispatch({ type: 'STOP_VIEWING_RESULT' });
};
