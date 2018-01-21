import { List, fromJS } from 'immutable';
import {commonLoadData, commonDeleteData} from './commonFunctions';

export const adminStudentGrroupListReducer = (state = List(), action) => {
    switch (action.type) {
        case 'STUDENT_GROUPS_LOADED':
            return fromJS(action.data);
        case 'STUDENT_GROUPS_DELETED':
            return state.filter(e=>e.get('id') != action.id);
        case 'LOGOUT':
            return List();
        default:
            return state;
    }
};

export const loadData = (dispatch) =>  commonLoadData(dispatch, '/api/userGroups',
          'STUDENT_GROUPS_LOADING', 'STUDENT_GROUPS_LOADED', 'STUDENT_GROUPS_LOADING_FAILED');

export const deleteItem = (dispatch, id) =>  commonDeleteData(dispatch, `/api/userGroups/${id}`,
          'STUDENT_GROUPS_DELETING', 'STUDENT_GROUPS_DELETED', 'STUDENT_GROUPS_DELETE_FAILED', id);
