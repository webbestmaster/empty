// @flow

import {type $Application, type $Request, type $Response} from 'express';

import type {ApiDataType} from '../../www/js/component/need-end-point/c-need-end-point';
import {typeConverter} from '../../www/js/lib/type';

import {hasProperty} from '../../www/js/lib/is';

import {getCollection} from './db/util';
import type {MongoUserType} from './db/type';
import {dataBaseConst} from './db/const';

export function addApiIntoApplication(app: $Application) {
    app.get('/api/some-api-url', async (request: $Request, response: $Response) => {
        const apiData: ApiDataType = {status: 'success'};

        response.json(apiData);
    });

    app.post('/api/register', async (request: $Request, response: $Response) => {
        console.log('---> /api/register');

        const {login, password} = typeConverter<{login: string, password: string}>(request.body);

        const userCollection = await getCollection<MongoUserType>(
            dataBaseConst.url.href,
            dataBaseConst.name,
            dataBaseConst.collection.user
        );

        const newUser: MongoUserType = {
            login,
            password,
            role: 'user',
            id: String(Math.random()),
        };

        await userCollection.insertOne(newUser);

        response.json({register: true});
    });

    app.post('/api/login', async (request: $Request, response: $Response) => {
        console.log('---> /api/login');

        const {login, password} = typeConverter<{login: string, password: string}>(request.body);

        const userCollection = await getCollection<MongoUserType>(
            dataBaseConst.url.href,
            dataBaseConst.name,
            dataBaseConst.collection.user
        );

        const user = await userCollection.findOne({login, password});

        if (user === null) {
            response.json({login: false});
            return;
        }

        // $FlowFixMe
        const userSession = hasProperty(request, 'session') ? request.session : {};

        Object.assign(userSession, {login});

        console.log('--- user ---');
        console.log(user);

        response.json({login: true});
    });
}
