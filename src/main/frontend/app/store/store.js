import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware, goBack as routerGoBack } from 'react-router-redux';
import {skilltestQuestionsReducer} from './skilltestQuestions.store.js';
import {skilltestResultsReducer, skilltestUserReducer} from './skilltestResults.store.js';
import {skilltestCreatorReducer} from './skilltestCreator.store.js';
import {skilltestListReducer} from './skilltestList.store.js';
import {useraccountReducer}from './useraccount.store.js';
import {adminTestResultsReducer} from './adminTestResults.store.js';
import {adminPageListReducer} from './adminPageList.store';
import {adminPageEditReducer} from './adminPageEdit.store';
import {adminUsersListReducer} from './adminUsersList.store';
import {adminUserEditReducer} from './adminUserEdit.store';
import {pageListReducer} from './pageList.store.js';
import {ajaxStatusReducer} from './net.store.js';
import { combineReducers } from 'redux-immutable';
import createEngine from 'redux-storage-engine-localstorage';
import merger from 'redux-storage-merger-immutablejs';
import * as storage from 'redux-storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import filter from 'redux-storage-decorator-filter';

export const history = createHistory();

const localStorageEngine = filter(createEngine('application-state-storage'),
    [
        'whitelisted-key',
    ['session']
    ],
    [
        'blacklisted-key',
    ['skilltest'],
    ]);

const routeMiddleware = routerMiddleware(history);
const sessionMiddleware = storage.createMiddleware(localStorageEngine, [],
  ['LOGIN_SUCCESSFUL', 'LOGOUT']);
const superReducer = combineReducers({
    skilltest: combineReducers({
        questions: skilltestQuestionsReducer,
        creator: skilltestCreatorReducer,
        list: skilltestListReducer,
        attempt: combineReducers({
            results: skilltestResultsReducer,
            data: skilltestUserReducer,
        }),
    }),
    pages: pageListReducer,
    admin: combineReducers({
        testResults: adminTestResultsReducer,
        pages: combineReducers({
            list: adminPageListReducer,
            edit: adminPageEditReducer,
        }),
        users: combineReducers({
            list: adminUsersListReducer,
            edit: adminUserEditReducer,
        })
    }),
    ajaxStatus: ajaxStatusReducer,
    session: useraccountReducer,
});
const reducer = storage.reducer(superReducer, merger);
const composeEnhancers = composeWithDevTools({});
const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(
    routeMiddleware,
    sessionMiddleware
  )
)(createStore);

const store = createStoreWithMiddleware(reducer);

export const load = storage.createLoader(localStorageEngine);

load(store);

export default store;
export function goBack() {
    store.dispatch(routerGoBack());
}
