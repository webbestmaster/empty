// @flow

/* global localStorage, document, window */

import type {ScreenContextType} from './c-screen-context';

export type ScreenWidthNameType = 'desktop' | 'tablet' | 'mobile';

const screenMinWidth: {[key: ScreenWidthNameType]: number} = {
    desktop: 1280,
    tablet: 768,
    mobile: 320,
};

export const screenNameReference: {[key: ScreenWidthNameType]: ScreenWidthNameType} = {
    desktop: 'desktop',
    tablet: 'tablet',
    mobile: 'mobile',
};

function getScreenName(screenWidth: number): ScreenWidthNameType {
    let screenName = 'mobile';

    Object.keys(screenMinWidth).every((screenNameInList: ScreenWidthNameType): boolean => {
        if (screenWidth >= screenMinWidth[screenNameInList]) {
            screenName = screenNameInList;
            return false;
        }

        return true;
    });

    return screenName;
}

function getLittleThenList(screenWidth: number): Array<ScreenWidthNameType> {
    const littleThenList = [];

    Object.keys(screenMinWidth).forEach((screenName: ScreenWidthNameType) => {
        if (screenWidth < screenMinWidth[screenName]) {
            littleThenList.push(screenName);
        }
    });

    return littleThenList;
}

export function getScreenState(): ScreenContextType {
    const {clientWidth, clientHeight} = document.documentElement || {clientWidth: 800, clientHeight: 600};

    const isLandscape = clientWidth > clientHeight; // use >, do not use >=, if width === height it is portrait
    const screenName = getScreenName(clientWidth);

    return {
        width: clientWidth,
        height: clientHeight,
        name: screenName,
        littleThenList: getLittleThenList(clientWidth),
        isDesktop: screenName === screenNameReference.desktop,
        isTablet: screenName === screenNameReference.tablet,
        isMobile: screenName === screenNameReference.mobile,
        isLandscape,
        isPortrait: !isLandscape,
    };
}
