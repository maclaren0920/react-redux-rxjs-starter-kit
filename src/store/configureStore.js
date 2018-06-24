import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from '../reducers';
import rootEpic from '../epics';
const epicMiddleware = createEpicMiddleware(rootEpic);

export default (initialState = {}) => {
    const middlewares = [thunk, epicMiddleware];
    const enhancers = [];
    // if (__DEV__) {
        const devToolsExtension = window.devToolsExtension;
        const logger =  require('redux-logger').createLogger;
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
        middlewares.push(logger());
    // }
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            ...enhancers
        )
    );
    return store;
}
