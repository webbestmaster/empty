// @flow

/* global window */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {onResize} from './action';
import type {GlobalStateType} from '../../app-reducer';

type PropsType = {|
    onResize: (width: number, height: number) => void
|};

type StateType = null;

class System extends Component<PropsType, StateType> {
    props: PropsType;
    state: StateType;

    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = null;
    }

    componentDidMount() {
        const view = this;
        const {props, state} = view;

        window.addEventListener(
            'resize',
            () => {
                const {documentElement} = window.document;
                const width: number = documentElement.clientWidth;
                const height: number = documentElement.clientHeight;

                props.onResize(width, height);
            },
            false
        );
    }

    render(): Node {
        return null;
    }
}

export default connect(
    (state: GlobalStateType): {} => ({}),
    {
        onResize
    }
)(System);
