// @flow

/* global window, document, requestAnimationFrame */

/* eslint consistent-this: ["error", "view"] */

import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import type {GlobalStateType} from '../../redux-store-provider/reducer';
import {forceResize} from '../../lib/screen';

import type {LocaleNameType} from '../locale-2/const';

import {localeNameReference} from '../locale-2/const';

import {LocaleContextConsumer} from '../locale-2/locale-context';

import type {LocaleContextType} from '../locale-2/locale-context';

import {getLocalizedString} from '../locale-2/locale-helper';

import type {OnResizeType} from './action';
import {onResize} from './action';
import type {SystemType} from './reducer/root';
import style from './style.css';
import {screenNameReference} from './reducer/screen';
import {setIsGlobalScrollEnable} from './helper';

type ReduxPropsType = {|
    +system: SystemType,
|};

type ReduxActionType = {|
    +onResize: (width: number, height: number) => OnResizeType,
|};

const reduxAction: ReduxActionType = {
    onResize, // imported from actions
};

type PassedPropsType = {|
    children: Node,
    // +passedProp: string
|};

type PropsType = {
    ...PassedPropsType,
    ...ReduxPropsType,
    ...ReduxActionType,
    +children: Node,
};

type StateType = null;

class System extends Component<ReduxPropsType, PassedPropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = null;
    }

    state: StateType;

    componentDidMount() {
        const view = this;

        window.addEventListener('resize', view.handleResize, false);
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        const view = this;
        const {props} = view;

        if (props.system.scroll.isEnable !== prevProps.system.scroll.isEnable) {
            setIsGlobalScrollEnable(props.system.scroll.isEnable);
        }
    }

    props: PropsType;

    handleResize = () => {
        const view = this;
        const {props} = view;
        const {system} = props;
        const {screen} = system;
        const {width, height} = screen;
        const {clientWidth, clientHeight} = document.documentElement || {clientWidth: 800, clientHeight: 600};

        if (clientWidth !== width || clientHeight !== height) {
            props.onResize(clientWidth, clientHeight);
            // need to update swipers
            requestAnimationFrame(() => {
                forceResize()
                    .then((): void => console.log('resized'))
                    .catch((): void => console.error('resized'));
            });
        }
    };

    getClassName(localeName: LocaleNameType): string {
        const view = this;
        const {props} = view;

        const screenProps = props.system.screen;
        const littleThenList = screenProps.littleThen;

        return classNames({
            [style.landscape]: screenProps.isLandscape,
            [style.portrait]: screenProps.isPortrait,
            [style.desktop]: screenProps.isDesktop,
            [style.tablet]: screenProps.isTablet,
            [style.mobile]: screenProps.isMobile,
            [style.lt_desktop_width]: littleThenList.includes(screenNameReference.desktop),
            [style.lt_tablet_width]: littleThenList.includes(screenNameReference.tablet),
            [style.locale__en_us]: localeName === localeNameReference.enUs,
            [style.locale__ru_ru]: localeName === localeNameReference.ruRu,
            [style.locale__zh_ch]: localeName === localeNameReference.zhCn,
            [style.locale__zh_tw]: localeName === localeNameReference.zhTw,
        });
    }

    render(): Node {
        const view = this;
        const {props} = view;

        return (
            <LocaleContextConsumer>
                {(localeContext: LocaleContextType): Node => {
                    return <div className={view.getClassName(localeContext.name)}>{props.children}</div>;
                }}
            </LocaleContextConsumer>
        );
    }
}

const ConnectedComponent = connect<ComponentType<System>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType): ReduxPropsType => ({
        system: state.system,
    }),
    reduxAction
)(System);

export {ConnectedComponent as System};
