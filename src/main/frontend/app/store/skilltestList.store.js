/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { List, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';
import {commonLoadData} from './commonFunctions';

export const skilltestListReducer = (state = List(), action) => {
    switch (action.type) {
        case 'TEST_LIST_LOADED':
            return action.data ? fromJS(action.data) : state;
        default:
            return state;
    }
};
export const loadTests = (dispatch) => commonLoadData(dispatch, '/api/tests/list',
         'TEST_LIST_LOADING', 'TEST_LIST_LOADED', 'TEST_LIST_LOADING_FAILED');

export const assignTest = (dispatch, type, testName) =>{
    dispatch({ type: 'ASSINGING_TEST_TYPE'});
    RestAPI.put(`/api/tests/assign?type=${type}&testName=${testName}`).then(()=>
    dispatch({ type: 'TEST_TYPE_ASSINGED'})
  ).catch(()=>
    dispatch({ type: 'TEST_TYPE_ASSINGNEMENT_FAILED'})
  );
};
