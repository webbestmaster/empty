// @flow

/* eslint react/no-multi-comp: 0 */

import type {Node} from 'react';
import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {Link, Route, Redirect} from 'react-router-dom';

import type {MatchType} from '../../type/react-router-dom-v5-type-extract';
import {PageWrapper} from '../page-wrapper/c-page-wrapper';
import pageWrapperStyle from '../page-wrapper/page-wrapper.style.scss';

export type RouteItemType = {|
    +path: string,
    // eslint-disable-next-line id-match
    +component: React$ComponentType<*>,
    +type: 'route',
|};

export type RedirectItemType = {|
    +from: string,
    +path: string,
    +type: 'redirect',
|};

const cssTransitionClassNameMap = {
    enter: pageWrapperStyle.transition_enter,
    enterActive: pageWrapperStyle.transition_enter_active,
    exit: pageWrapperStyle.transition_exit,
    exitActive: pageWrapperStyle.transition_exit_active,
};

function isRoute(routeItem: RouteItemType | RedirectItemType): boolean %checks {
    return routeItem.type === 'route';
}

function isRedirect(routeItem: RouteItemType | RedirectItemType): boolean %checks {
    return routeItem.type === 'redirect';
}

export function redderRoute(routeItem: RouteItemType | RedirectItemType): Node {
    const {path} = routeItem;

    if (isRedirect(routeItem)) {
        return <Redirect from={routeItem.from} key={routeItem.from + path} to={path}/>;
    }

    const {component: PageComponent} = routeItem;

    return (
        <Route exact key={path} path={path}>
            {(contextRouterData: {match: MatchType | null}): Node => {
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

export function redderEmptyRoute(routeItem: RouteItemType | RedirectItemType): Node {
    const {path} = routeItem;

    if (isRedirect(routeItem)) {
        return <Redirect from={routeItem.from} key={routeItem.from + path} to={path}/>;
    }

    return <Route exact key={path} path={path}/>;
}

export function redderLink(routeItem: RouteItemType): Node {
    const {path} = routeItem;

    return (
        <Link key={path} to={path}>
            {path}
        </Link>
    );
}
