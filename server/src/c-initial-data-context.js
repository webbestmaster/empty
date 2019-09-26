// @flow

/* global localStorage */

/* eslint consistent-this: ["error", "view"] */

import type {Node} from 'react';
import React, {Component} from 'react';

import {getLocaleName} from '../../www/js/component/locale/locale-helper';
import type {LocaleNameType} from '../../www/js/component/locale/const';
import type {ApiDataType} from '../../www/js/component/need-end-point/c-need-end-point';
import type {LocaleContextType} from '../../www/js/component/locale/c-locale-context';

export type InitialDataType = {|
    +apiData: ApiDataType | null,
|};

export const defaultInitialData: InitialDataType = {
    apiData: null,
};

const initialDataContext = React.createContext<InitialDataType>(defaultInitialData);

export const InitialDataProvider = initialDataContext.Provider;

export const InitialDataConsumer = initialDataContext.Consumer;
