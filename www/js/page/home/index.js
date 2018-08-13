// @flow

/* global BUILD_DATE */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import MainModel from '../../lib/main-model';

type RuterPropsType = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends Component<void, null> {
    props: RuterPropsType;
    state: null;

    componentDidMount() {
        const newModel = new MainModel();

        newModel.set('prop', 'value');
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        console.log(props, state);

        return <div>home page</div>;
    }
}
