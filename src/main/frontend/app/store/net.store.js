/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { Map } from 'immutable';
import {RestAPI} from '@/net.js';

export const ajaxStatusReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'POSTING':
            return state.set('posting', true);
        case 'POSTED':
            return state.set('posting', false).set('message', action.message);
        default:
            return state;
    }
};
export const post = (dispatch, url, data) =>{
    dispatch({ type: 'POSTING' });
    RestAPI.post(url, data).then(
      () => {
          dispatch({ type: 'POSTED', message: 'Success!'});
      }
    ).catch(
      (response) => {
          dispatch({ type: 'POSTED', message: `Failed! :( ${response}` });
      }
    );
};
