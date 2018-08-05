// @flow

import type {AuthType} from './components/auth/reducer';
import auth from './components/auth/reducer';

import type {LocaleType} from './components/locale/reducer';
import locale from './components/locale/reducer';

import type {SystemType} from './components/system/reducer';
import system from './components/system/reducer';

export {auth, locale, system};

export type GlobalStateType = {|
    +auth: AuthType,
    +locale: LocaleType,
    +system: SystemType
|};
