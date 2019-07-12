// @flow

import type {Node} from 'react';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {ReduxStoreProvider} from '../../redux-store-provider/provider';
import {System} from '../system/c-system';
import {Auth} from '../auth/c-auth';
import {Home} from '../../page/home/c-home';
import {appConst} from '../../const';
import {Login} from '../../page/login/c-login';
import {userIsAuthenticated, userIsNotAuthenticated} from '../auth/auth-helper';
import {PageNotFound} from '../../page/page-not-found/c-page-not-found';

import {MyContextProvider} from '../locale-2/c-locale-2';

import {routes} from './routes';

console.log(appConst);

export function App(): Node {
    return (
        /* eslint-disable react/jsx-max-depth */
        // you can replace the extra <div> with any react component
        <ReduxStoreProvider>
            <>
                <MyContextProvider>
                    <Auth key="auth"/>
                    <System key="system">
                        <BrowserRouter>
                            <Switch key="switch">
                                <Route component={userIsNotAuthenticated(Login)} exact path={routes.login}/>

                                <Route component={userIsAuthenticated(Home)} exact path={routes.index}/>

                                <Route component={PageNotFound}/>
                            </Switch>
                        </BrowserRouter>
                    </System>
                </MyContextProvider>
            </>
        </ReduxStoreProvider>
        /* eslint-enable react/jsx-max-depth */
    );
}
