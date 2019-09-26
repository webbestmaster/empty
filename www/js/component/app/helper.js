// @flow

/* eslint react/no-multi-comp: 0 */

import type {Node} from 'react';
import React from 'react';
import {Link, Route} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import type {ContextRouterType} from '../../type/react-router-dom-v4';

import pageStyle from './page.style.scss';

export type RouteItemType = {|
    +path: string,
    +name: string,
    // eslint-disable-next-line id-match
    +component: React$ComponentType<*>,
|};

export function redderRoute(routeItem: RouteItemType): Node {
    const {path, component: PageComponent} = routeItem;

    return (
        <Route exact key={path} path={path}>
            {(contextRouterData: ContextRouterType): Node => {
                const {match} = contextRouterData;

                return (
                    <CSSTransition classNames="page" in={match !== null} timeout={3000} unmountOnExit>
                        <div className="page">
                            <PageComponent/>
                        </div>
                    </CSSTransition>
                );
            }}
        </Route>
    );
}

export function redderEmptyRoute(routeItem: RouteItemType): Node {
    const {path} = routeItem;

    return <Route exact key={path} path={path}/>;
}

export function redderLink(routeItem: RouteItemType): Node {
    const {path, name} = routeItem;

    return (
        <Link key={path} to={path}>
            {name}
        </Link>
    );
}
