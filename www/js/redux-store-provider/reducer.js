// @flow

import type {AuthType} from '../component/auth/reducer';
// import type {SystemType} from '../component/system/reducer/root';

export {auth} from '../component/auth/reducer';
// export {system} from '../component/system/reducer/root';

export type GlobalStateType = {|
    +auth: AuthType,
    // +system: SystemType,
|};
