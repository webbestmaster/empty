// @flow

import type {OnResizeType, OnSetIsScrollEnableType} from '../component/system/action';
import type {SetPopupStateType, SetUserType} from '../component/auth/action';

type DefaultActionDataType = {|type: string|};

export type ActionDataType =
    | DefaultActionDataType
    | OnResizeType
    | SetUserType
    | SetPopupStateType
    | OnSetIsScrollEnableType;
