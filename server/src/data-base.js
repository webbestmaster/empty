// @flow

import assert from 'assert';

import {MongoClient} from 'mongodb';

import type {NullableType} from '../../www/js/lib/type';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const databaseName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, (clientError: NullableType<Error>, client: NullableType<MongoClient>) => {
    assert.equal(null, clientError);

    if (client === null) {
        console.log('Connected failed to mongodb server');
        return;
    }
    console.log('Connected successfully to mongodb server');

    const dataBase = client.db(databaseName);

    const collection = dataBase.collection<{item: number}>('documents');
    // Insert some documents

    collection.insertMany([{item: 1}, {item: 2}, {item: 3}], (insertError: Error | null, result: mixed) => {
        // assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        console.log('Inserted 3 documents into the collection');
        client.close((closeError: NullableType<Error>) => {
            if (closeError instanceof Error) {
                console.error('Mongo db client closed with error');
                return;
            }

            console.error('Mongo db client closed successfully');
        });
        // callback(result);
    });
});

export const smth = 5;
