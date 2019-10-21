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

### How to download backup

Execute this from your local machine:

```bash
$ scp deploy@188.166.70.236:~/<file-name>.zip ~/<file-name>.zip
```
