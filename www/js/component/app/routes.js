// @flow

// import {Component} from 'react';
// import {React$ComponentType} from 'react';

import {Home} from '../../page/home/c-home';
import {Login} from '../../page/login/c-login';
import {AboutUs} from '../../page/about-us/c-about-us';
import {Contact} from '../../page/contact/c-contact';
import {PageNotFound} from '../../page/page-not-found/c-page-not-found';

import type {RouteItemType} from './helper';

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
    {
        path: '/about-us',
        name: 'About Us',
        component: AboutUs,
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
    },
    // {
    //     path: undefined,
    //     name: '404 - Page Not Found',
    //     component: PageNotFound,
    // },
];
