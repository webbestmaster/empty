// @flow

/* global window */

import {combineReducers} from 'redux';
import {screen, type ScreenType} from './screen';
import {scroll, type ScrollType} from './scroll';

export type SystemType = {|
    +screen: ScreenType,
    +scroll: ScrollType
|};

const system = combineReducers({
    screen,
    scroll
});

export {system};
