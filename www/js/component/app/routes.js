// @flow

// import {Component} from 'react';
// import {React$ComponentType} from 'react';

import {Home} from '../../page/home/c-home';
import {Login} from '../../page/login/c-login';

export type RouteItemType = {|
    +path: string,
    +name: string,
    // eslint-disable-next-line id-match
    +component: React$ComponentType<*>,
|};

export const routeItemList: Array<RouteItemType> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
];
