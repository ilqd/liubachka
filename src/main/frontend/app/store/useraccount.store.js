import {RestAPI} from '@/net.js';
import{Map} from 'immutable';

export const useraccountReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESSFUL':
            return state.set(action.questionId, action.answer);
        case 'CLEAR_ATTEMPT_DATA':
            return Map();
        default:
            return state;
    }
};


export const tryToLogin = (dispatch, username, pass) => {
    dispatch({ type: 'LOGIN_ATTEMPT_STARTED' });
    return RestAPI.post('/login', { username, password: pass })
    .then((response) => {
        dispatch({ type: 'LOGIN_SUCCESSFUL',  csrf: response.CSRF });
    },
      () => {
          dispatch({ type: 'LOGIN_FAILED' });
      }
    );
};
