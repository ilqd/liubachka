/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { Map, List } from 'immutable';

export const skilltestCreatorReducer = (state = Map(), action) => {
    let answerPath = [];
    switch (action.type) {
        case 'ADD_NEW_QUESTION':
            return state.set('questions',
            state.get('questions', new List()).push(
              new Map().set('answerType', action.qType).set('answers', new List())
            ));
        case 'REMOVE_QUESTION':
            return state.set('questions', state.get('questions').delete(action.qIdx));
        case 'ALTER_FIELD':
            return state.set(action.fieldName, action.value);
        case 'ALTER_QUESTION_FIELD':
            return state.setIn(['questions', action.qIdx, action.field], action.value);
        case 'ADD_NEW_ANSWER':
            answerPath = ['questions', action.qIdx, 'answers'];
            return state.setIn(answerPath, state.getIn(answerPath).push(new Map()));
        case 'ADD_NEW_TEXT_ANSWER':
            answerPath = ['questions', action.qIdx, 'correctAnswers'];
            return state.setIn(answerPath, state.getIn(answerPath, new List()).push(''));
        case 'ALTER_ANSWER_FIELD':
            answerPath = ['questions', action.qIdx, 'answers', action.aIdx, action.field];
            return state.setIn(answerPath, action.value);
        case 'ALTER_TEXT_ANSWER_FIELD':
            answerPath = ['questions', action.qIdx, 'correctAnswers', action.aIdx];
            return state.setIn(answerPath, action.value);

        case 'REMOVE_ANSWER':
            answerPath = ['questions', action.qIdx, 'answers'];
            return state.setIn(answerPath, state.getIn(answerPath).delete(action.aIdx));
        default:
            return state;
    }
};

export const addQuestion = (dispatch, qType = 'SELECT_ONE')  =>
dispatch({ type: 'ADD_NEW_QUESTION', qType });

export const removeQuestion = (dispatch, qIdx)  =>
dispatch({ type: 'REMOVE_QUESTION', qIdx });

export const alterField = (dispatch, fieldName, value) =>
dispatch({ type: 'ALTER_FIELD', fieldName, value });

export const setQuestionText = (dispatch, qIdx, value)  =>
dispatch({ type: 'ALTER_QUESTION_FIELD', field: 'question', qIdx, value });

export const setQuestionValue = (dispatch, qIdx, value)  =>
dispatch({ type: 'ALTER_QUESTION_FIELD', field: 'pointsAwarded', qIdx, value });

export const addAnswer = (dispatch, qIdx)  =>
dispatch({ type: 'ADD_NEW_ANSWER', qIdx });

export const addTextAnswer = (dispatch, qIdx)  =>
dispatch({ type: 'ADD_NEW_TEXT_ANSWER', qIdx });

export const removeAnswer = (dispatch, qIdx, aIdx)  =>
dispatch({ type: 'REMOVE_ANSWER', qIdx, aIdx });

export const setAnswerText = (dispatch, qIdx, aIdx, value)  =>
dispatch({ type: 'ALTER_ANSWER_FIELD', field: 'text', qIdx, aIdx, value });

export const setCorrectAnswerText = (dispatch, qIdx, aIdx, value)  =>
dispatch({ type: 'ALTER_TEXT_ANSWER_FIELD', qIdx, aIdx, value });

export const setAnswerCorrert = (dispatch, qIdx, aIdx, value)  =>
dispatch({ type: 'ALTER_ANSWER_FIELD', field: 'correct', qIdx, aIdx, value });
