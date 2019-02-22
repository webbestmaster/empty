// @flow

/* global window, PROJECT_ID */

export type LocaleNameType = 'en-US' | 'ru-RU' | 'zh-CN' | 'zh-TW';
import {enUs} from './translation/en-us/data';
import {ruRu} from './translation/ru-ru/data';
import {zhCn} from './translation/zh-cn/data';
import {zhTw} from './translation/zh-tw/data';

export const localeNameReference: {[key: string]: LocaleNameType} = {
    enUs: 'en-US',
    ruRu: 'ru-RU',
    zhCn: 'zh-CN',
    zhTw: 'zh-TW',
};

export const allLocales = {
    [localeNameReference.enUs]: enUs,
    [localeNameReference.ruRu]: ruRu,
    [localeNameReference.zhCn]: zhCn,
    [localeNameReference.zhTw]: zhTw,
};

const localeNameList: Array<LocaleNameType> = Object.keys(localeNameReference).map(
    (localeKey: string): LocaleNameType => localeNameReference[localeKey]
);

export const localeConst = {
    action: {
        type: {
            setLocale: 'locale__set-locale',
        },
    },
    defaults: {
        localeName: localeNameReference.enUs,
    },
    key: {
        localStorage: {
            // eslint-disable-next-line id-match
            localeName: PROJECT_ID + '-locale-name-v.1.0',
        },
    },
    localeNameList,
};
