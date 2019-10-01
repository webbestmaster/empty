// @flow

// import {Component} from 'react';
// import {React$ComponentType} from 'react';

import {Home} from '../../page/home/c-home';
import {Login} from '../../page/login/c-login';
import {AboutUs} from '../../page/about-us/c-about-us';
import {Contact} from '../../page/contact/c-contact';

import type {RedirectItemType, RouteItemType} from './render-route-helper';

export const routeItemMap: {[key: string]: RouteItemType | RedirectItemType} = {
    home: {
        path: '/',
        component: Home,
        type: 'route',
    },
    login: {
        path: '/login',
        component: Login,
        type: 'route',
    },
    aboutUs: {
        path: '/about-us',
        component: AboutUs,
        type: 'route',
    },
    contact: {
        path: '/contact',
        component: Contact,
        type: 'route',
    },
};
