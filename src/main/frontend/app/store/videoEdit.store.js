import { Map, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';

export const videoEditReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'VIDEO_EDIT_LOADED':
            return fromJS(action.data);
        case 'VIDEO_FIELD_CHANGED': return state.set(action.field, action.value);
        case 'LOGOUT':
        case 'CLEAR_VIDEO_EDIT':
            return new Map();
        default:
            return state;
    }
};

export const clearData = (dispatch) => dispatch({type: 'CLEAR_VIDEO_EDIT'});

export const loadVideo = (dispatch, id) =>{
    dispatch({ type: 'VIDEO_EDIT_LOADING' });
    RestAPI.get(`/api/video/${id}`).then((data)=>
        dispatch({ type: 'VIDEO_EDIT_LOADED', data}))
      .catch((data)=>
        dispatch({ type: 'VIDEO_EDIT_LOADING_FAILED', data})
      );
};
export const saveVideo = (dispatch, data) =>{
    const method = data.get('id') || data.get('id') === 0 ? RestAPI.put : RestAPI.postWithProgress;
    dispatch({ type: 'VIDEO_EDIT_SAVING' });
    dispatch({ type: 'POSTING' });
    method('/api/video/upload', data, false).then((response)=>{
        dispatch({ type: 'VIDEO_EDIT_SAVED', response});
        dispatch({ type: 'POSTED', message: 'Success!'});
        dispatch({ type: 'UPLOAD_PROGRESS', progress: 100});
    })
    .catch((response)=>{
        dispatch({ type: 'VIDEO_EDIT_SAVE_FAILED', response});
        let message = 'Ошибка! :(';
        if (!response.status) {
            message = 'Ошибка! :( Возможная причина - файл слишком большой или потеряно соединение с сервером.';
        }else if (response.message) {
            message = `Ошибка! :( Сервер жалуется на это:   ${response.message}.`;
        }
        dispatch({ type: 'POSTED', message });
    }
    );
};

export const updateVideoField = (dispatch, field, value)=> dispatch({type: 'VIDEO_FIELD_CHANGED', field, value});
