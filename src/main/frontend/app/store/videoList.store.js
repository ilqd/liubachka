import { List, fromJS } from 'immutable';
import {RestAPI} from '@/net.js';
import {commonLoadData} from './commonFunctions';

function proccessVideoHidden(state, id, bool) {
    const idx = state.findIndex(e=>e.get('id') == id);
    if (idx > -1) {
        return state.setIn([idx, 'hidden'], bool);
    }
    return state;
}

export const videoListReducer = (state = List(), action) => {
    switch (action.type) {
        case 'VIDEO_LIST_LOADED':
            return fromJS(action.data);
        case 'LOGOUT':
            return List();
        case 'VIDEO_DELETED':
            return proccessVideoHidden(state, action.id, true);
        case 'VIDEO_RESTORED':
            return proccessVideoHidden(state, action.id, false);
        default:
            return state;
    }
};

export const loadVideos = (dispatch) =>  commonLoadData(dispatch, '/api/video/list',
           'VIDEO_LIST_LOADING', 'VIDEO_LIST_LOADED', 'VIDEO_LIST_LOADING_FAILED');

export const setHidden = (dispatch, id, value)=>{
    dispatch({ type: 'POSTING' });
    if (value) {
        dispatch({ type: 'VIDEO_DELETING'});
        RestAPI.patch(`/api/video/delete/${id}`)
        .then((data)=>{
            dispatch({ type: 'VIDEO_DELETED', id, data});
            dispatch({ type: 'POSTED'});
        })
        .catch((data)=>{
            dispatch({ type: 'VIDEO_DELETE_FAILED', data});
            dispatch({ type: 'POSTED'});
        });
    }else{
        dispatch({ type: 'VIDEO_RESTORING'});
        RestAPI.patch(`/api/video/restore/${id}`)
        .then(()=>{
            dispatch({ type: 'VIDEO_RESTORED', id});
            dispatch({ type: 'POSTED'});
        })
        .catch((data)=>{
            dispatch({ type: 'VIDEO_RESTORE_FAILED', data});
            dispatch({ type: 'POSTED'});
        });
    }
};
