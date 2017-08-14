/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { Map, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const skilltestQuestionsReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'TEST_DATA_LOADED':
            return state.clear().merge(fromJS(action.data));
        default:
            return state;
    }
};
export const loadData = (dispatch, data) =>
dispatch({ type: 'TEST_DATA_LOADED', data });

export const loadTestTypeData = (dispatch, type)=>{
    dispatch({ type: 'LOADING_TEST_DATA' });
    RestAPI.get(`/api/tests/getAssigned/${type}`).then(
      (data) => dispatch({ type: 'TEST_DATA_LOADED', data: fromJS(data)})
      ).catch(()=>dispatch({ type: 'TEST_DATA_LOADING_FAILED'}));
};
