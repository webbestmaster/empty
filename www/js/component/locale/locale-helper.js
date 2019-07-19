// @flow

/* global localStorage, navigator, IS_PRODUCTION */

import {hasProperty} from '../../lib/is';

import type {LocaleNameType} from './const';
import {allLocalesData, localeConst, localeNameList} from './const';
import type {LangKeyType} from './translation/type';

export type ValueMapType = {
    [key: string]: string | number,
};

export function getLocaleName(): LocaleNameType {
    const savedLocaleName = localStorage.getItem(localeConst.key.localStorage.localeName);

    let localeName: LocaleNameType = localeConst.defaults.localeName;

    const hasGotFromStorage = localeNameList.some((localeNameInList: LocaleNameType): boolean => {
        if (localeNameInList === savedLocaleName) {
            localeName = localeNameInList;
            return true;
        }

        return false;
    });

    if (hasGotFromStorage) {
        return localeName;
    }

    const navigatorLanguages = navigator.languages;

    if (!Array.isArray(navigatorLanguages)) {
        return localeName;
    }

    navigatorLanguages.some((deviceLocaleName: mixed): boolean => {
        return localeNameList.some((localeNameInList: LocaleNameType): boolean => {
            if (localeNameInList === deviceLocaleName) {
                localeName = localeNameInList;
                return true;
            }
            return false;
        });
    });

    return localeName;
}

function replacePlaceholderMap(rawString: string, valueMap: ValueMapType): string {
    let resultString = rawString;

    Object.keys(valueMap).forEach((valueKey: string) => {
        resultString = resultString.replace(`{${valueKey}}`, String(valueMap[valueKey]));
    });

    return resultString;
}

export function getLocalizedString(
    stringKey: LangKeyType,
    localeName: LocaleNameType,
    valueMap?: ValueMapType
): string {
    // eslint-disable-next-line id-match
    if (!IS_PRODUCTION) {
        if (!stringKey) {
            console.error('stringKey is not define', stringKey);
            return 'TEXT';
        }

        if (!hasProperty(allLocalesData[localeConst.defaults.localeName], stringKey)) {
            console.error('has no key stringKey', stringKey);
            return stringKey;
        }
    }

    const resultString = allLocalesData[localeName][stringKey];

    return valueMap ? replacePlaceholderMap(resultString, valueMap) : resultString;
}
