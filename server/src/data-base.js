// @flow

import assert from 'assert';

import {MongoClient} from 'mongodb';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const databaseName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, (error: Error | null, client: {}) => {
    assert.equal(null, error);

    console.log('Connected successfully to mongodb server');

    const dataBase = client.db(databaseName);

    const collection = dataBase.collection('documents');
    // Insert some documents

    collection.insertMany([{a: 1}, {a: 2}, {a: 3}], function (error_, result) {
        // assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        console.log('Inserted 3 documents into the collection');
        client.close();
        // callback(result);
    });
});

export const smth = 5;
