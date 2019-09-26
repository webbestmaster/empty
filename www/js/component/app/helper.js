// @flow

/* eslint react/no-multi-comp: 0 */

import type {Node} from 'react';
import React from 'react';
import {Link, Route} from 'react-router-dom';

import type {RouteItemType} from './routes';

export function redderRoute(routeItem: RouteItemType): Node {
    const {path, name, component} = routeItem;

    return <Route component={component} exact key={name} path={path}/>;
}

export function redderLink(routeItem: RouteItemType): Node {
    const {path, name} = routeItem;

    return (
        <Link key={name} to={path}>
            {name}
        </Link>
    );
}
