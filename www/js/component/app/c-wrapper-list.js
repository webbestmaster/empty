// @flow

import React, {type Node} from 'react';

type PropsType = {|
    // eslint-disable-next-line id-match
    +wrapperList: Array<React$ComponentType<*>>,
    +children: Node,
|};

export function WrapperList(props: PropsType): Node {
    const {wrapperList, children} = props;

    if (wrapperList.length === 0) {
        return children;
    }

    const [FirstComponent, ...restComponentList] = wrapperList;

    return (
        <FirstComponent>
            <WrapperList wrapperList={restComponentList}>{children}</WrapperList>
        </FirstComponent>
    );
}
