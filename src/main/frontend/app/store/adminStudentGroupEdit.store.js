import { Map, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';
import {SUCCESS_MESSAGE} from './net.store';
import {commonLoadData} from './commonFunctions';

const defaultState = Map({enabled: true});

export const adminStudentGroupEditReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADMIN_STUDENT_GROUP_EDIT_LOADED':
            return fromJS(action.data);
        case 'STUDENT_GROUP_FIELD_CHANGED': return state.set(action.field, action.value);
        case 'LOGOUT':
        case 'ADMIN_CLEAR_STUDENT_GROUP':
            return defaultState;
        default:
            return state;
    }
};
export const clearData = (dispatch) => dispatch({type: 'ADMIN_CLEAR_STUDENT_GROUP'});

export const loadData = (dispatch, id) => commonLoadData(dispatch, `/api/userGroups/${id}`,
         'ADMIN_STUDENT_GROUP_EDIT_LOADING', 'ADMIN_STUDENT_GROUP_EDIT_LOADED', 'ADMIN_STUDENT_GROUP_EDIT_LOADING_FAILED');

export const save = (dispatch, data) =>{
    const method = data.get('id') || data.get('id') === 0 ? RestAPI.patch : RestAPI.post;
    dispatch({ type: 'ADMIN_SAVING_STUDENT_GROUP' });
    method('/api/userGroups', data).then((response)=>{
        dispatch({ type: 'ADMIN_STUDENT_GROUP_SAVED', response});
        dispatch({ type: 'POSTED', message: SUCCESS_MESSAGE});
    })
    .catch((response)=>{
        dispatch({ type: 'POSTED', message: `Ошибка! :( Сервер жалуется на это:   ${response.message}.` });
        dispatch({ type: 'ADMIN_STUDENT_GROUP_SAVE_FAILED', response});
    }
    );
};

export const updateField = (dispatch, field, value)=> dispatch({type: 'STUDENT_GROUP_FIELD_CHANGED', field, value});
