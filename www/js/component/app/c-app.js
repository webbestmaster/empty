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
import {defaultInitialData, InitialDataProvider} from '../../../../server/src/c-initial-data-context';
import type {InitialDataType} from '../../../../server/src/c-initial-data-context';

import {routeItemList} from './routes';
import type {RouteItemType} from './routes';

// console.log(appConst);

export function App(): Node {
    return (
        <BrowserRouter>
            <InnerApp initialData={window.initialData || defaultInitialData}/>
        </BrowserRouter>
    );
}

function redderRoute(routeItem: RouteItemType): Node {
    const {path, component} = routeItem;

    return <Route component={component} exact path={path}/>;
}

export function InnerApp(props: {|+initialData: InitialDataType|}): Node {
    const {initialData} = props;

    return (
        <InitialDataProvider value={initialData}>
            <LocaleProvider>
                <ScreenProvider>
                    <MainWrapper>
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
