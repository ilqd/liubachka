import { Map, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';
import {SUCCESS_MESSAGE} from './net.store';
import {commonLoadData} from './commonFunctions';

const defaultState = Map();

export const adminCardFolderEditReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADMIN_CARD_FOLDER_EDIT_LOADED':
            return fromJS(action.data).set('editMode', true);
        case 'ADMIN_CARD_FOLDER_FIELD_CHANGED': return state.set(action.field, action.value);
        case 'ADMIN_CARD_FOLDER_FIELDS_CHANGED': return state.merge(fromJS(action.object));
        case 'LOGOUT':
        case 'ADMIN_CLEAR_CARD_FOLDER':
            return defaultState;
        default:
            return state;
    }
};
export const clearData = (dispatch) => dispatch({type: 'ADMIN_CLEAR_CARD_FOLDER'});

export const loadData = (dispatch, id) => commonLoadData(dispatch, `/api/cards/folder/${id}`,
  'ADMIN_CARD_FOLDER_EDIT_LOADING', 'ADMIN_CARD_FOLDER_EDIT_LOADED', 'ADMIN_CARD_FOLDER_EDIT_LOADING_FAILED');

export const save = (dispatch, data) =>{
    const method = data.get('id') || data.get('id') === 0 ? RestAPI.patch : RestAPI.post;
    dispatch({ type: 'ADMIN_SAVING_CARD_FOLDER' });
    method('/api/cards/folder', data).then((response)=>{
        dispatch({ type: 'ADMIN_CARD_FOLDER_SAVED', response});
        dispatch({ type: 'POSTED', message: SUCCESS_MESSAGE});
    })
    .catch((response)=>{
        dispatch({ type: 'POSTED', message: `Ошибка! :( Сервер жалуется на это:   ${response.message}.` });
        dispatch({ type: 'ADMIN_CARD_FOLDER_SAVE_FAILED', response});
    }
    );
};

export const updateField = (dispatch, field, value)=> dispatch({type: 'ADMIN_CARD_FOLDER_FIELD_CHANGED', field, value});

export const updateFieldMerge = (dispatch, object)=> dispatch({type: 'ADMIN_CARD_FOLDER_FIELDS_CHANGED', object});
