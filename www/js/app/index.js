// @flow

import type {Node} from 'react';
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import System from '../component/system';
import Auth from '../component/auth';

import Home from '../page/home';

import routes from './routes';

export default (): Array<Node> => [
    <Auth key="auth"/>,
    <System key="system">
        <Switch key="switch">
            <Route component={Home} path={routes.index} exact/>
            <Route component={Home} path={routes.indexEn} exact/>
            <Route component={Home} path={routes.indexRu} exact/>
            <Route component={Home} path={routes.indexZhCn} exact/>
            <Route component={Home} path={routes.indexZhTw} exact/>
        </Switch>
    </System>
];
