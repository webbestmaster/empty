### Server dependencies:

```
- express
    - express-session
    - body-parser
    - compression
    - cors

- mongodb
```

### Server scripts:

```
- start-ssr-server:dev
- start-ssr-server:build
```

### MongoDB

1. Install or download mongodb

2. Mongodb \
2.1. Run

> $ ~/soft/mongo/bin/mongod --config ./mongodb.config

2.2. Stop mongodb

> $ ps -ax | grep -i mongod // 24409 ttys000 0:00.00 grep mongod \
> $ kill \<PID\>

2.3. Make backup

> $ ~/soft/mongo/bin/mongodump --port=27017 --out=db/backup/001

or

> $ ~/soft/mongo/bin/mongodump --port=27017 --archive=db/backup/db-dump-\`date +%Y-%m-%d-%H-%M-%S\`.zip

2.4. Restore backup

Clean folder db/data if needed.

> $ ~/soft/mongo/bin/mongorestore db/backup/001 --port=27017

or

> $ ~/soft/mongo/bin/mongorestore --port=27017 --archive=db/backup/001.zip

2.5. Some commands in mongodb console/client (~/soft/mongo/bin/mongo):
> $ ~/soft/mongo/bin/mongo --port=27017 --host=127.0.0.1 // run client  
> $ show databases // show all data bases name  
> $ use \<data base name\> // switched to db \<data base name\>  
> $ show collections // show all collection in current db  
> $ db.getCollectionNames() // the same: show collections  
> $ db.\<collection name\>.find() // show all documents of collection
> $ db.shutdownServer() // shutdown server

### DB replication

// log  
Admins-iMac:empty dmitryturovtsov$ mongod --config ./mongodb-1.config
about to fork child process, waiting until server is ready for connections.
forked process: 22066
child process started successfully, parent exiting
Admins-iMac:empty dmitryturovtsov$ mongod --config ./mongodb-2.config
about to fork child process, waiting until server is ready for connections.
forked process: 22069
child process started successfully, parent exiting
Admins-iMac:empty dmitryturovtsov$ mongod --config ./mongodb-3.config
about to fork child process, waiting until server is ready for connections.
forked process: 22074
child process started successfully, parent exiting
Admins-iMac:empty dmitryturovtsov$ mongod --config ./mongodb-4.config
about to fork child process, waiting until server is ready for connections.
forked process: 22079
child process started successfully, parent exiting


Admins-iMac:empty dmitryturovtsov$ mongo --port 27001
MongoDB shell version v4.2.0
connecting to: mongodb://127.0.0.1:27001/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("11c98e9f-aff2-41f8-80cf-a7c0f06b40a4") }
MongoDB server version: 4.2.0
Server has startup warnings: 
2019-10-21T19:46:17.714+0300 I  CONTROL  [initandlisten] 
2019-10-21T19:46:17.715+0300 I  CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2019-10-21T19:46:17.715+0300 I  CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2019-10-21T19:46:17.715+0300 I  CONTROL  [initandlisten] 

rs.status()

rs.initiate({"_id" : "MyBestReplica", members : [{"_id" : 0, priority : 3, host : "127.0.0.1:27001"}, {"_id" : 1, host : "127.0.0.1:27002", arbiterOnly : true}, {"_id" : 2, host : "127.0.0.1:27003"}, {"_id" : 3, host : "127.0.0.1:27004"} ]});

### How to download backup

Execute this from your local machine:

```bash
$ scp deploy@188.166.70.236:~/<file-name>.zip ~/<file-name>.zip
```
