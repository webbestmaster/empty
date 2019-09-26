// @flow

import type {Node} from 'react';
import React, {Component} from 'react';

type PropsType = {};
type StateType = null;

// eslint-disable-next-line react/prefer-stateless-function
export class PageNotFound extends Component<PropsType, StateType> {
    render(): Node {
        return <h1>Page Not Found, Sorry :(</h1>;
    }
}
