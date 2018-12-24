// @flow

/* global BUILD_DATE */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';
// import MainModel from '../../lib/main-model';
import type {ContextRouterType} from '../../type/react-router-dom-v4';
import {LoadComponent} from '../../lib/c-load-component';
import homeStyle from './home.style.scss';

type PropsType = {
    ...$Exact<ContextRouterType>,
};

class Mega<S, N: number> {
    constructor(str: S) {
        console.log(str);
    }
}

// eslint-disable-next-line react/prefer-stateless-function
export class Home extends Component<void, null> {
    props: PropsType;
    state: null;

    componentDidMount() {

        /*
        const newModel = new MainModel<'prop', number>('prop', 1);

        const onChangeProps = (oldValue: number | void, newValue: number | void) => {
            console.log('newModel.attr');
            console.log(oldValue, newValue);
            console.log(newModel.attr);
        };

        newModel.onChange('prop', onChangeProps);

        newModel.trigger('prop');
        newModel.trigger('prop');
        newModel.trigger('prop');

        newModel.offChange('prop', onChangeProps);

        // newModel.set({prop: 11});
        newModel.set('prop', 12);
        newModel.set('prop', 13);

        console.log(newModel);

        const mega = new Mega(1);

        console.log(mega);

        console.log(this.props.match);
        */
    }

    handleMouseOver = () => {
        const view = this;

        console.log(view.state);
    };

    loadAsyncLoadTestComponent = async (): Promise<Node> => {
        const {
            AsyncLoadTest,
        } = await import(/* webpackChunkName: 'async-load-test' */ './../../component/test/c-async-load-test');

        return <AsyncLoadTest/>;
    };

    render(): Node {
        const view = this;
        const {props, state} = view;

        console.log(props, state);

        return (
            <div className={homeStyle.home__wrapper}>
                <button type="button" onKeyPress={view.handleMouseOver} onClick={view.handleMouseOver}>
                    | the button |
                </button>
                <br/>
                <span>home page</span>
                <hr/>
                <LoadComponent load={view.loadAsyncLoadTestComponent}/>
            </div>
        );
    }
}
