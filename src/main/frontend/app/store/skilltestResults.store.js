/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { Map } from 'immutable';
import {RestAPI} from '@/net.js';

export const skilltestResultsReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'ANSWER_GIVEN':
            return state.set(action.questionId, action.answer);
        case 'CLEAR_ATTEMPT_DATA':
            return Map();
        default:
            return state;
    }
};

export const answerGiven = (dispatch, questionId, answer) =>
dispatch({ type: 'ANSWER_GIVEN', questionId, answer });

export const restartTest = (dispatch) =>
dispatch({ type: 'CLEAR_ATTEMPT_DATA'});

export const skilltestUserReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'TEST_STARTED':
            return state.set('id', action.id);
        case 'TEST_FINISED':
            return state.set('finished', true);
        case 'CLEAR_ATTEMPT_DATA':
            return Map();
        case 'CHANGE_EXAMINEE_INFO':
            return state.set(action.field, action.value);
        default:
            return state;
    }
};


export const finishTest = (dispatch)  =>
dispatch({ type: 'TEST_FINISED' });

export const submitTestResults = (dispatch, data, isInterested)  =>{
    dispatch({ type: 'TEST_FINALIZED' });
    dispatch({ type: 'POSTING'});
    data.interested = isInterested;
    RestAPI.post('/api/results/update', data).then(
      () => {
          dispatch({ type: 'POSTED', message: isInterested ? 'Спасибо за Ваш интерес, наши менеджеры свяжутся с вами!' : 'Спасибо за Ваш интерес!'});
      }
      ).catch(()=>{
          dispatch({ type: 'POSTED', message: isInterested ? 'Что-то пошло не так, сервер вернул ошибку :(' : undefined});
      });
};

export const changeExamineeInfo = (dispatch, field, value) =>
dispatch({ type: 'CHANGE_EXAMINEE_INFO', field, value });

export const startTest = (dispatch, data) =>{
    dispatch({ type: 'STARTING_TEST'});
    dispatch({ type: 'POSTING'});
    RestAPI.post('/api/results/start', data).then(
        (response) => {
            dispatch({ type: 'TEST_STARTED', id: response});
            dispatch({ type: 'POSTED'});
        }
        ).catch(()=>{
            dispatch({ type: 'FAILED_TO_START_TEST'});
            dispatch({ type: 'POSTED'});
        });
};
