// @flow
/* global window, BUILD_DATE */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import App from './app';

import * as reducers from './app-reducer';

const reducer = combineReducers({
    ...reducers
});

const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    window.document.querySelector('.js-app-wrapper')
);

// check build
// eslint-disable-next-line id-match
window.BUILD_DATE = BUILD_DATE;
