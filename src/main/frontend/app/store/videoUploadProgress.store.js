import { Map } from 'immutable';

export const videoUploadProgressReducer = (state = new Map, action) => {
    switch (action.type) {
        case 'UPLOAD_PROGRESS':
            return state.set('percent', action.progress);
        case 'LOGOUT':
        case 'VIDEO_EDIT_LOADING':
        case 'VIDEO_LIST_LOADING':
        case 'VIDEO_EDIT_SAVING':
        case 'VIDEO_EDIT_SAVE_FAILED':
        case 'CLEAR_VIDEO_EDIT':
            return new Map();
        default:
            return state;
    }
};
