/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { Map } from 'immutable';

export const skilltestResultsReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'ANSWER_GIVEN':
            return state.set(action.questionId, action.answer);
        case 'RESTART_TEST':
            return Map();
        case 'TEST_FINISED':
            return state.set('finished', true);
        default:
            return state;
    }
};
export const answerGiven = (dispatch, questionId, answer) =>
dispatch({ type: 'ANSWER_GIVEN', questionId, answer });

export const finishTest = (dispatch)  =>
dispatch({ type: 'TEST_FINISED' });

export const restartTest = (dispatch)  =>
dispatch({ type: 'RESTART_TEST' });
