// @flow

import React from 'react';
import type {Node} from 'react';

import {getLocalizedString} from './locale-helper';
import type {LangKeyType} from './translation/type';
import {LocaleContextConsumer} from './c-locale-context';
import type {LocaleContextType} from './c-locale-context';
import type {ValueMapType} from './locale-helper';

type LocalePropsType = {|
    +stringKey: LangKeyType,
    +valueMap?: ValueMapType,
|};

export function Locale(props: LocalePropsType): Node {
    const {stringKey, valueMap} = props;

    return (
        <LocaleContextConsumer>
            {(localeContext: LocaleContextType): string => getLocalizedString(stringKey, localeContext.name, valueMap)}
        </LocaleContextConsumer>
    );
}
