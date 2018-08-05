// @flow

import type {SetLocaleType} from './components/locale/action';
import type {OnResizeType} from './components/system/action';
import type {SetUserType} from './components/auth/action';

type DefaultActionDataType = {|type: string|};

export type ActionDataType = DefaultActionDataType | OnResizeType | SetUserType | SetLocaleType;
