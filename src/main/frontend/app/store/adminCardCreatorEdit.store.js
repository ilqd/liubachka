import { Map, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';
import {commonLoadData} from './commonFunctions';
import {SUCCESS_MESSAGE} from './net.store';

const defaultData = fromJS({
    separator: '  ',
    text: 'I\'m  beign held  in basement  and  was forced  to do  this  text splitting  and  creating  cards  for  the activity  game  application  If  you  see  this  message  call  911  please',
    label: 'I\'m just a little harmless label, dont touch me please  :(',
    linesPerCard: 10,
});

export const adminCardCreatorEditReducer = (state = defaultData, action) => {
    switch (action.type) {
        case 'ADMIN_CARD_ITEM_EDIT_LOADED':
            return fromJS(action.data).set('editMode', true);
        case 'ADMIN_CARD_ITEM_FIELD_CHANGED': return state.set(action.field, action.value);
        case 'ADMIN_CARD_ITEM_FIELDS_CHANGED': return state.merge(fromJS(action.object));
        case 'LOGOUT':
        case 'ADMIN_CARD_ITEM_EDIT_CLEAR_DATA':
            return Map();
        default:
            return state;
    }
};
export const clearData = (dispatch, ) => dispatch({ type: 'ADMIN_CARD_ITEM_EDIT_CLEAR_DATA' });

export const loadData = (dispatch, id) =>  commonLoadData(dispatch, `/api/cards/item/${id}`,
       'ADMIN_CARD_ITEM_EDIT_LOADING', 'ADMIN_CARD_ITEM_EDIT_LOADED', 'ADMIN_CARD_ITEM_EDIT_LOADING_FAILED');


export const updateField = (dispatch, field, value)=> dispatch({type: 'ADMIN_CARD_ITEM_FIELD_CHANGED', field, value});

export const updateFieldMerge = (dispatch, object)=> dispatch({type: 'ADMIN_CARD_ITEM_FIELDS_CHANGED', object});

export const save = (dispatch, data) =>{
    const method = data.get('id') || data.get('id') === 0 ? RestAPI.patch : RestAPI.post;
    dispatch({ type: 'ADMIN_SAVING_CARD_ITEM' });
    method('/api/cards/item', data).then((response)=>{
        dispatch({ type: 'ADMIN_CARD_ITEM_SAVED', response});
        dispatch({ type: 'POSTED', message: SUCCESS_MESSAGE});
    })
    .catch((response)=>{
        dispatch({ type: 'POSTED', message: `Ошибка! :( Сервер жалуется на это:   ${response.message}.` });
        dispatch({ type: 'ADMIN_CARD_ITEM_SAVE_FAILED', response});
    }
    );
};
