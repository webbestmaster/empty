// @flow

/* global window */

/* eslint consistent-this: ["error", "view"] */
import type {ComponentType, Node} from 'react';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import type {SetUserType} from './action';
import {setUser} from './action';
import type {AuthType, UserType} from './reducer';
import type {GlobalStateType} from '../../redux-store-provider/reducer';

type ReduxPropsType = {|
    +auth: AuthType
|};

type ReduxActionType = {|
    +setUser: (userState: UserType) => SetUserType
|};

type PassedPropsType = {||};

type StateType = null;

class Auth extends Component<ReduxPropsType, PassedPropsType, StateType> {
    // eslint-disable-next-line id-match
    props: $Exact<{...PassedPropsType, ...ReduxPropsType, ...ReduxActionType}>;
    state: StateType;

    componentDidMount() {
        const view = this;
        const {props} = view;

        props.setUser({id: 'default-user-id'});
    }

    render(): Node {
        return null;
    }
}

const reduxAction: ReduxActionType = {
    setUser
};

const ConnectedComponent = connect<ComponentType<Auth>, PassedPropsType, ReduxPropsType, ReduxActionType>(
    (state: GlobalStateType): ReduxPropsType => ({
        auth: state.auth
    }),
    reduxAction
)(Auth);

export {ConnectedComponent as Auth};
