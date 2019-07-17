// @flow

/* global localStorage */

/* eslint consistent-this: ["error", "view"] */

import React, {Component} from 'react';
import type {Node} from 'react';

import {localeConst} from './const';
import type {LocaleNameType} from './const';
import {getLocaleName} from './locale-helper';

export type LocaleContextType = {|
    +name: LocaleNameType,
    +setName: (localeName: LocaleNameType) => void,
|};

const defaultContextData = {
    name: getLocaleName(),
    setName: (localeName: LocaleNameType) => {},
};

const localeContext = React.createContext<LocaleContextType>(defaultContextData);
const LocaleContextProvider = localeContext.Provider;

export const LocaleContextConsumer = localeContext.Consumer;

type PropsType = {|
    +children: Node,
|};

type StateType = {|
    +providedData: LocaleContextType,
|};

export class LocaleProvider extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        const view = this;

        view.state = {
            providedData: defaultContextData,
        };
    }

    setName = (localeName: LocaleNameType) => {
        const view = this;

        console.log('---> write to localStorage:', localeConst.key.localStorage.localeName, localeName);
        localStorage.setItem(localeConst.key.localStorage.localeName, localeName);

        view.setState({name: localeName});
    };

    getProviderValue(): LocaleContextType {
        const view = this;
        const {state} = view;

        return {
            ...state.providedData,
            setName: view.setName,
        };
    }

    render(): Node {
        const view = this;
        const {props} = view;
        const {children} = props;

        return <LocaleContextProvider value={view.getProviderValue()}>{children}</LocaleContextProvider>;
    }
}
