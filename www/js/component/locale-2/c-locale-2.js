// @flow

import React from 'react';
import type {Node} from 'react';

import {getLocalizedString} from './locale-helper';
import type {LangKeyType} from './translation/type';
import {LocaleContextConsumer} from './locale-context';
import type {LocaleContextType} from './locale-context';

export type ValueMapType = {
    [key: string]: string | number,
};

type Locale2PropsType = {|
    +stringKey: LangKeyType,
    +valueMap?: ValueMapType,
|};

export function Locale2(props: Locale2PropsType): Node {
    const {stringKey, valueMap} = props;

    return (
        <LocaleContextConsumer>
            {(localeContext: LocaleContextType): string => getLocalizedString(stringKey, localeContext.name, valueMap)}
        </LocaleContextConsumer>
    );
}
