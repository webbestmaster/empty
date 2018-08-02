// @flow

/* global BUILD_DATE */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends Component<void, void> {
    render(): Node {
        return <div>home page</div>;
    }
}
