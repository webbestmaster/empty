// @flow

import type {MongoDataBase, MongoCollection} from 'mongodb';
import {MongoClient} from 'mongodb';

import type {NullableType} from '../../../www/js/lib/type';
import {hasProperty} from '../../../www/js/lib/is';

import {dataBaseConst} from './const';

const getDataBaseCache: {[key: string]: Promise<MongoDataBase>} = {};

export async function getDataBase(url: string, name: string): Promise<MongoDataBase> {
    if (hasProperty(getDataBaseCache, name)) {
        console.log('getDataBase: MongoDataBase get from cache, name:', name);
        return getDataBaseCache[name];
    }

    getDataBaseCache[name] = new Promise<MongoDataBase>((resolve: MongoDataBase => mixed) => {
        MongoClient.connect(url, (clientError: NullableType<Error>, client: NullableType<MongoClient>) => {
            if (clientError instanceof Error) {
                throw new TypeError('Can not connect to mongo server: ' + url);
            }

            if (client === null) {
                throw new Error('Mongo client is not define');
            }

            resolve(client.db(name));
        });
    });

    console.log('getDataBase: MongoDataBase defined');

    return getDataBaseCache[name];
}

export async function getCollection<ItemType>(name: string): Promise<MongoCollection<ItemType>> {
    const dataBase = await getDataBase(dataBaseConst.url.href, dataBaseConst.name);

    return dataBase.collection<ItemType>(name);
}
