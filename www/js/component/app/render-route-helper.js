// @flow

/* eslint react/no-multi-comp: 0 */

import type {Node} from 'react';
import React from 'react';
import {Link, Route} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import type {ContextRouterType} from '../../type/react-router-dom-v4';
import {PageWrapper} from '../page-wrapper/c-page-wrapper';
import pageWrapperStyle from '../page-wrapper/page-wrapper.style.scss';

export type RouteItemType = {|
    +path: string,
    +name: string,
    // eslint-disable-next-line id-match
    +component: React$ComponentType<*>,
|};

const cssTransitionClassNameMap = {
    enter: pageWrapperStyle.transition_enter,
    enterActive: pageWrapperStyle.transition_enter_active,
    exit: pageWrapperStyle.transition_exit,
    exitActive: pageWrapperStyle.transition_exit_active,
};

export function redderRoute(routeItem: RouteItemType): Node {
    const {path, component: PageComponent} = routeItem;

    return (
        <Route exact key={path} path={path}>
            {(contextRouterData: ContextRouterType): Node => {
                const {match} = contextRouterData;

                return (
                    <CSSTransition
                        classNames={cssTransitionClassNameMap}
                        in={match !== null}
                        // see ../page-wrapper/page-wrapper.style.scss to use the same transition duration
                        timeout={3000}
                        unmountOnExit
                    >
                        <PageWrapper>
                            <PageComponent/>
                        </PageWrapper>
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