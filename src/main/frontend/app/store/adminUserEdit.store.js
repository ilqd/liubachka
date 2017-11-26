import { Map, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

const defaultState = Map({enabled: true});

export const adminUserEditReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADMIN_USER_EDIT_LOADED':
            return fromJS(action.data);
        case 'USER_FIELD_CHANGED': return state.set(action.field, action.value);
        case 'LOGOUT':
        case 'ADMIN_CLEAR_USER_EDIT':
            return defaultState;
        default:
            return state;
    }
};
export const clearData = (dispatch) => dispatch({type: 'ADMIN_CLEAR_USER_EDIT'});

export const loadUser = (dispatch, id) =>{
    dispatch({ type: 'ADMIN_USER_EDIT_LOADING' });
    RestAPI.get(`/api/users/${id}`).then((data)=>
        dispatch({ type: 'ADMIN_USER_EDIT_LOADED', data}))
      .catch((data)=>
        dispatch({ type: 'ADMIN_USER_EDIT_LOADING_FAILED', data})
      );
};
export const saveUser = (dispatch, data) =>{
    const method = data.get('id') || data.get('id') === 0 ? RestAPI.put : RestAPI.post;
    dispatch({ type: 'ADMIN_SAVING_USER' });
    method('/api/users', data).then((response)=>{
        dispatch({ type: 'ADMIN_USER_SAVED', response});
        dispatch({ type: 'POSTED', message: 'Success!'});
    })
    .catch((response)=>
      dispatch({ type: 'ADMIN_USER_SAVE_FAILED', response})
    );
};

export const updateUserFields = (dispatch, field, value)=> dispatch({type: 'USER_FIELD_CHANGED', field, value});
