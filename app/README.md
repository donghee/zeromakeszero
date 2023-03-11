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

## Run app at System Boot

```
$ npm install -g pm2
$ pm2 start app.js --name 0makes0-app
$ pm2 start ./run-mongod.sh --name 0makes0-db
$ pm2 save

$ pm2 startup -u donghee
```

Confirm the systemd service
```
$ sudo systemctl status pm2-donghee.service
```
