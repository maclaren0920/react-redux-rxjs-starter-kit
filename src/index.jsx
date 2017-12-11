import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import RouterMap from './router/routerMap';
import createBrowserHistory from 'history/createBrowserHistory';

import 'babel-polyfill';
const history = createBrowserHistory();
const store = configureStore();

render(
    <Provider store={store}>
        <RouterMap history={history} />
    </Provider>,
    document.getElementById('root')
);
