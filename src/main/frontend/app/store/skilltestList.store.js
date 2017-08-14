/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { List, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const skilltestListReducer = (state = List(), action) => {
    switch (action.type) {
        case 'TEST_LIST_LOADED':
            return action.data ? action.data : state;
        default:
            return state;
    }
};
export const loadTests = (dispatch) =>{
    dispatch({ type: 'TEST_LIST_LOADING'});
    RestAPI.get('/api/tests/list').then(
      (data) => {
          dispatch({ type: 'TEST_LIST_LOADED', data: fromJS(data)});
      }
    );
};
export const assignTest = (dispatch, type, testName) =>{
    dispatch({ type: 'ASSINGING_TEST_TYPE'});
    RestAPI.put(`/api/tests/assign?type=${type}&testName=${testName}`).then(()=>
    dispatch({ type: 'TEST_TYPE_ASSINGED'})
  ).catch(()=>
    dispatch({ type: 'TEST_TYPE_ASSINGNEMENT_FAILED'})
  );
};
