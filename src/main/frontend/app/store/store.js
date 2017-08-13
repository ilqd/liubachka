import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import {skilltestQuestionsReducer} from './skilltestQuestions.store.js';
import {skilltestResultsReducer} from './skilltestResults.store.js';
import {skilltestCreatorReducer} from './skilltestCreator.store.js';
import {ajaxStatusReducer} from './net.store.js';
import { combineReducers } from 'redux-immutable';
import createEngine from 'redux-storage-engine-localstorage';
import merger from 'redux-storage-merger-immutablejs';
import * as storage from 'redux-storage';
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createHistory();
const middleware = routerMiddleware(history);

const superReducer = combineReducers({
    skilltest: combineReducers({
        questions: skilltestQuestionsReducer,
        results: skilltestResultsReducer,
        creator: skilltestCreatorReducer,
    }),
    ajaxStatus: ajaxStatusReducer,
});
const reducer = storage.reducer(superReducer, merger);
const composeEnhancers = composeWithDevTools({});
const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(
    middleware
  )
)(createStore);

const store = createStoreWithMiddleware(reducer);
const engine = createEngine('application-state-storage');
export const load = storage.createLoader(engine);

load(store);

export default store;
