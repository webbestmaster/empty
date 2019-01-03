// @flow

import type {Node} from 'react';
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import {ReduxStoreProvider} from '../../redux-store-provider/provider';

import {System} from '../system/c-system';
import {Auth} from '../auth/c-auth';
import {Home} from '../../page/home/c-home';

import {routes} from './routes';
import {appConst} from '../../const';
import {Login} from '../../page/login/c-login';
import {userIsAuthenticated, userIsNotAuthenticated} from '../auth/auth-helper';

console.log(appConst);

export function App(): Node {
    return (
        /* eslint-disable react/jsx-max-depth */
        // you can replace the extra <div> with any react component
        <ReduxStoreProvider>
            <div>
                <Auth key="auth"/>
                <System key="system">
                    <BrowserRouter>
                        <Switch key="switch">
                            <Route component={userIsNotAuthenticated(Login)} path={routes.login} exact/>

                            <Route component={userIsAuthenticated(Home)} path={routes.index} exact/>
                        </Switch>
                    </BrowserRouter>
                </System>
            </div>
        </ReduxStoreProvider>
        /* eslint-enable react/jsx-max-depth */
    );
}
