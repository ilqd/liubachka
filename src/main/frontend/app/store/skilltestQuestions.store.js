/* eslint new-cap: ["error", { "capIsNew": false }]*/
import { Map, fromJS } from 'immutable';

export const skilltestQuestionsReducer = (state = Map(), action) => {
    switch (action.type) {
        case 'TEST_DATA_LOADED':
            return state.merge(fromJS(action.data));
        default:
            return state;
    }
};
export const loadData = (dispatch, data) =>
dispatch({ type: 'TEST_DATA_LOADED', data });
