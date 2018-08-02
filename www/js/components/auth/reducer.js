// @flow

import {combineReducers} from 'redux';
import type {SetUserType} from './action';
import {authConst} from './const';

export type UserType = {|
    +id: string
|};

const defaultUserState: UserType = {
    id: ''
};

// module
export type AuthType = {|
    +user: UserType
|};

export default combineReducers({
    user: (userState: UserType = defaultUserState, {type, payload}: SetUserType): UserType => {
        if (type !== authConst.action.type.setUserState) {
            return userState;
        }

        return payload;
    }
});
