// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';

type PropsType = {};
type StateType = null;

// eslint-disable-next-line react/prefer-stateless-function
export class Login extends Component<PropsType, StateType> {
    render(): Node {
        return <h1>Login page</h1>;
    }
}
