// @flow

export type MongoUserRoleType = 'user' | 'admin';

export type MongoUserType = {|
    id: string,
    role: MongoUserRoleType,
    login: string,
    password: string,
|};
