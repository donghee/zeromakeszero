# Apps
 - /webzine/vol1-3

## Install

```
$ sudo apt-get install mongodb-org
```

## Run mongo db

```
$ mongod --dbpath ./db

$ mongo

> db.data.insert({"q": "q 0", "a": "a 0"})
```

## Run app

```
$ nodejs app.js
```
