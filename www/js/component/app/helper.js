// @flow

import type {Node} from 'react';
import React from 'react';
import {Route} from 'react-router-dom';

import type {RouteItemType} from './routes';

export function redderRoute(routeItem: RouteItemType): Node {
    const {path, component} = routeItem;

    return <Route component={component} exact path={path}/>;
}
