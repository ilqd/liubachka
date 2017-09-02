/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { Map, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const adminPageEditReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'PAGE_TO_EDIT_LOADED':
            return fromJS(action.data);
        case 'CHANGE_PAGE_FIELD':
            return state.set(action.field, action.value);
        case 'LOGOUT':
        case 'CREATING_NEW_PAGE':
            return Map();
        default:
            return state;
    }
};

export const createNewPage = (dispatch) =>{
    dispatch({ type: 'CREATING_NEW_PAGE' });
};
export const loadPageToEdit = (dispatch, id) =>{
    dispatch({ type: 'LOADING_PAGE_TO_EDIT' });
    RestAPI.get(`/api/page/${id}`).then((data)=>
      dispatch({ type: 'PAGE_TO_EDIT_LOADED', data}))
    .catch((data)=>
      dispatch({ type: 'PAGE_TO_EDIT_LOAD_FAILED', data})
    );
};
export const changeField = (dispatch, field, value) =>{
    dispatch({ type: 'CHANGE_PAGE_FIELD', field, value });
};
export const save = (dispatch, data) =>{
    dispatch({type: 'SAVING_PAGE'});
    dispatch({ type: 'POSTING' });
    RestAPI.put('/api/page/savePage', data).then(
      () => {
          dispatch({ type: 'POSTED', message: 'Success!'});
      }
    ).catch(
      (response) => {
          dispatch({ type: 'POSTED', message: `Failed! :( Server is complaining about this:   ${response.message}` });
      }
    );
};
