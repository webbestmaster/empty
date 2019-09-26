// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';

import pageWrapperStyle from './page-wrapper.style.scss';

type PropsType = {
    +children: Node,
};

type StateType = null;

// eslint-disable-next-line react/prefer-stateless-function
export class PageWrapper extends Component<PropsType, StateType> {
    render(): Node {
        const view = this;
        const {props} = view;

        return <div className={pageWrapperStyle.page_wrapper}>{props.children}</div>;
    }
}
