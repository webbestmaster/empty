// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import type {ContextRouterType} from '../../type/react-router-dom-v4';

type PropsType = {
    ...$Exact<ContextRouterType>,
};

// eslint-disable-next-line react/prefer-stateless-function
export class PageNotFound extends Component<void, null> {
    props: PropsType;
    state: null;

    render(): Node {
        return <h1>PageNotFound</h1>;
    }
}
