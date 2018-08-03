// @flow

import type {Node} from 'react';
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import System from '../components/system';
import Auth from '../components/auth';

import Home from '../page/home';

import routes from './routes';

export default (): Array<Node> => [
    <Auth key="auth"/>,
    <System key="system"/>,
    <Switch key="switch">
        <Route component={Home} path={routes.index} exact/>
    </Switch>
];
