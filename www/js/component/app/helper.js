// @flow

/* eslint react/no-multi-comp: 0 */

import type {Node} from 'react';
import React from 'react';
import {Link, Route} from 'react-router-dom';

export type RouteItemType = {|
    +path: string,
    +name: string,
    // eslint-disable-next-line id-match
    +component: React$ComponentType<*>,
|};

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
