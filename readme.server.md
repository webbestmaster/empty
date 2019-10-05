### Server dependencies:

```
- express
- express-session
- compression
- cors
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

> ~/soft/mongo/bin/mongod --config ./mongodb.config

2.2. Stop mongodb

> ps -ax | grep -i mongod // 24409 ttys000 0:00.00 grep mongod \
> kill \<PID\>

2.3. Make backup

> ~/soft/mongo/bin/mongodump --port=27017 --out=db/backup/001

or

> ~/soft/mongo/bin/mongodump --port=27017 --archive=db/backup/001.zip

2.4. Restore backup

Clean folder db/data if needed.

> ~/soft/mongo/bin/mongorestore db/backup/001 --port=27017

or

> ~/soft/mongo/bin/mongorestore --port=27017 --archive=db/backup/001.zip
