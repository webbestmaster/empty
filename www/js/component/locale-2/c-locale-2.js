// @-f-l-o-w

import React, {Component} from 'react';
import type {Node} from 'react';

export const MyContext = React.createContext({locale: ''});

export class MyContextProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render(): Node {
        return <MyContext.Provider value="ert">{this.props.children}</MyContext.Provider>;
    }
}

export class Locale2 extends Component {
    render(): Node {
        return <MyContext.Consumer>{(value: mixed): mixed => value}</MyContext.Consumer>;
    }
}
