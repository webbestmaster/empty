// @flow

declare module 'mongodb' {
    declare type MongoClientConnectCallBackType = (connectError: Error | null, client: MongoClient | null) => mixed;

    declare type MongoCollectionActionOperationType = {};

    declare type MongoCollectionActionResultType = {
        ops: Array<MongoCollectionActionOperationType>,
    };

    declare type MongoCollectionActionCallBackType = (
        actionError: Error | null,
        actionResult: MongoCollectionActionResultType | null,
    ) => mixed;

    declare export class MongoCollection<ItemTheType> {
        insertMany: (itemList: Array<ItemTheType>, callBack: MongoCollectionActionCallBackType) => mixed,
    }

    declare export class MongoDataBase {
        collection: <ItemType>(collectionName: string) => MongoCollection<ItemType>,
    }

    declare export class MongoClient {
        static connect: (url: string, callBack: MongoClientConnectCallBackType) => mixed,
        db: (dataBaseName: string) => MongoDataBase,
        close: (closeCallBack: (Error | null) => mixed) => mixed,
    }
}
