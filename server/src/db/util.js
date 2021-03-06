// @flow

import type {MongoDataBase, MongoCollection} from 'mongodb';
import {MongoClient} from 'mongodb';

import type {NullableType} from '../../../www/js/lib/type';
import {hasProperty} from '../../../www/js/lib/is';
import {getTime} from '../util/time';

import {dataBaseConst} from './const';
import type {MongoUserType} from './type';

const getDataBaseCache: {[key: string]: Promise<MongoDataBase>} = {};

export async function getDataBase(name: string): Promise<MongoDataBase> {
    if (hasProperty(getDataBaseCache, name)) {
        console.log('getDataBase: MongoDataBase get from cache, name:', name);
        return getDataBaseCache[name];
    }

    getDataBaseCache[name] = new Promise<MongoDataBase>((resolve: MongoDataBase => mixed) => {
        MongoClient.connect(
            dataBaseConst.url,
            (clientError: NullableType<Error>, client: NullableType<MongoClient>) => {
                if (clientError instanceof Error) {
                    throw new TypeError('Can not connect to mongo server');
                }

                if (client === null) {
                    throw new Error('Mongo client is not define');
                }

                resolve(client.db(name));
            }
        );
    });

    console.log('getDataBase: MongoDataBase defined');

    return getDataBaseCache[name];
}

export async function getCollection<ItemType>(
    dataBaseName: string,
    collectionName: string
): Promise<MongoCollection<ItemType>> {
    const dataBase = await getDataBase(dataBaseName);

    return dataBase.collection<ItemType>(collectionName);
}

/*
// change user type
async function updateUserType() {
    const userCollection = await getCollection<MongoUserType>(dataBaseConst.name, dataBaseConst.collection.user);

    userCollection.updateMany({}, {$set: {register: {date: getTime()}}}, {}, function () {
        console.log(arguments);
    });
}

updateUserType();
*/
