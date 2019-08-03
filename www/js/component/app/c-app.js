// @flow

/* eslint-disable react/jsx-max-depth, react/no-multi-comp */

import type {Node} from 'react';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Home} from '../../page/home/c-home';
// import {appConst} from '../../const';
import {Login} from '../../page/login/c-login';
import {PageNotFound} from '../../page/page-not-found/c-page-not-found';
import {LocaleProvider} from '../locale/c-locale-context';
import {ScreenProvider} from '../screen/c-screen-context';
import {MainWrapper} from '../main-wrapper/c-main-wrapper';

import {routes} from './routes';

// console.log(appConst);

export function App(): Node {
    return (
        <BrowserRouter>
            <InnerApp/>
        </BrowserRouter>
    );
}

export function InnerApp(): Node {
    return (
        <LocaleProvider>
            <ScreenProvider>
                <MainWrapper>
                    <Switch key="switch">
                        <Route component={Login} exact path={routes.login}/>
                        <Route component={Home} exact path={routes.index}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </MainWrapper>
            </ScreenProvider>
        </LocaleProvider>
    );
}
