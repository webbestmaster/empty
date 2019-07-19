// @flow

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React from 'react';
import classNames from 'classnames';

import type {LocaleContextType} from '../locale/c-locale-context';
import {LocaleContextConsumer} from '../locale/c-locale-context';
import type {ScreenContextType} from '../screen/c-screen-context';
import {ScreenContextConsumer} from '../screen/c-screen-context';
import {localeNameReference} from '../locale/const';
import {screenNameReference} from '../screen/screen-helper';

import mainWrapperStyle from './main-wrapper.style.css';

type PropsType = {|
    +children: Node,
|};

export function MainWrapper(props: PropsType): Node {
    const {children} = props;

    return (
        <LocaleContextConsumer>
            {(localeContextData: LocaleContextType): Node => {
                return (
                    <ScreenContextConsumer>
                        {(screenContextData: ScreenContextType): Node => {
                            return <div className={getClassName(localeContextData, screenContextData)}>{children}</div>;
                        }}
                    </ScreenContextConsumer>
                );
            }}
        </LocaleContextConsumer>
    );
}

function getClassName(localeContextData: LocaleContextType, screenContextData: ScreenContextType): string {
    return classNames({
        [mainWrapperStyle.landscape]: screenContextData.isLandscape,
        [mainWrapperStyle.portrait]: screenContextData.isPortrait,
        [mainWrapperStyle.desktop]: screenContextData.isDesktop,
        [mainWrapperStyle.tablet]: screenContextData.isTablet,
        [mainWrapperStyle.mobile]: screenContextData.isMobile,
        [mainWrapperStyle.lt_desktop_width]: screenContextData.littleThenList.includes(screenNameReference.desktop),
        [mainWrapperStyle.lt_tablet_width]: screenContextData.littleThenList.includes(screenNameReference.tablet),
        [mainWrapperStyle.locale__en_us]: localeContextData.name === localeNameReference.enUs,
        [mainWrapperStyle.locale__ru_ru]: localeContextData.name === localeNameReference.ruRu,
        [mainWrapperStyle.locale__zh_ch]: localeContextData.name === localeNameReference.zhCn,
        [mainWrapperStyle.locale__zh_tw]: localeContextData.name === localeNameReference.zhTw,
    });
}
