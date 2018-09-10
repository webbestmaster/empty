// @flow

import {combineReducers} from 'redux';
import type {PopupStateType} from './action';
import {authConst} from './const';
import type {ActionDataType} from '../../app-reducer-type';

export type UserType = {|
    +id: string
|};

const defaultUserState: UserType = {
    id: ''
};

export type PopupNameType = 'login';

export type PopupMapStateType = {|
    +login: PopupStateType
|};

const defaultPopupMapState: PopupMapStateType = {
    [authConst.popupName.login]: {
        isOpen: false
    }
};

type ReducerType = {|
    +user: (UserType, ActionDataType) => UserType,
    +popup: (PopupMapStateType, actionData: ActionDataType) => PopupMapStateType
|};

export type AuthType = {|
    +user: $Call<$PropertyType<ReducerType, 'user'>>,
    +popup: $Call<$PropertyType<ReducerType, 'popup'>>
|};

const reducer: ReducerType = {
    user: (userState: UserType = defaultUserState, actionData: ActionDataType): UserType => {
        if (actionData.type !== authConst.action.type.setUserState) {
            return userState;
        }

        if (typeof actionData.payload === 'undefined') {
            return userState;
        }

        return actionData.payload;
    },
    popup: (popupMapState: PopupMapStateType = defaultPopupMapState, actionData: ActionDataType): PopupMapStateType => {
        if (actionData.type !== authConst.action.type.setPopupState) {
            return popupMapState;
        }

        if (typeof actionData.payload === 'undefined') {
            return popupMapState;
        }

        const {popupName, state} = actionData.payload;

        const newState = {...popupMapState[popupName], ...state};

        return {...popupMapState, [popupName]: newState};
    }
};

export default combineReducers(reducer);
