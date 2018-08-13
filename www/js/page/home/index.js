// @flow

/* global BUILD_DATE */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import MainModel from '../../lib/main-model';

type RuterPropsType = {};

class Mega<S, N: number> {
    constructor(str: S) {
        console.log(str);
    }
}

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends Component<void, null> {
    props: RuterPropsType;
    state: null;

    componentDidMount() {
        const newModel: MainModel<'prop', number> = new MainModel();

        newModel.onChange('prop', (oldValue: number | void, newValue: number | void) => {
            console.log('newModel.attr');
            console.log(newModel.attr);
        });

        newModel.set('prop', 11);
        newModel.set('prop', 12);
        newModel.set('prop', 13);

        console.log(newModel);

        const mega = new Mega(1);

        console.log(mega);
    }

    render(): Node {
        const view = this;
        const {props, state} = view;

        console.log(props, state);

        return <div>home page</div>;
    }
}
