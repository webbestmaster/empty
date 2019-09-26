// @flow

/* global window */

/* eslint-disable react/jsx-max-depth, react/no-multi-comp */

import type {Node} from 'react';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {PageNotFound} from '../../page/page-not-found/c-page-not-found';
import {LocaleProvider} from '../locale/c-locale-context';
import {ScreenProvider} from '../screen/c-screen-context';
import {MainWrapper} from '../main-wrapper/c-main-wrapper';
import type {InitialDataType} from '../../../../server/src/c-initial-data-context';
import {defaultInitialData, InitialDataProvider} from '../../../../server/src/c-initial-data-context';

import {routeItemList} from './routes';
import {redderLink, redderRoute} from './helper';

export function App(): Node {
    return (
        <BrowserRouter>
            <InnerApp initialData={window.initialData || defaultInitialData}/>
        </BrowserRouter>
    );
}

export function InnerApp(props: {|+initialData: InitialDataType|}): Node {
    const {initialData} = props;

    return (
        <InitialDataProvider value={initialData}>
            <LocaleProvider>
                <ScreenProvider>
                    <MainWrapper>
                        <nav>{routeItemList.map(redderLink)}</nav>
                        <Switch key="switch">
                            {routeItemList.map(redderRoute)}
                            <Route component={PageNotFound}/>
                        </Switch>
                    </MainWrapper>
                </ScreenProvider>
            </LocaleProvider>
        </InitialDataProvider>
    );
}
