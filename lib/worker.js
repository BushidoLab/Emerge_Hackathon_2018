'use strict';

const Kue = require('kue');

const { REDIS_PORT, REDIS_HOST } = process.env;

const q = Kue.createQueue({

    prefix: 'q',
    redis: {
        port: REDIS_PORT,
        host: REDIS_HOST,
        // auth: 'password',
        // db: 3, // if provided select a non-default redis db
        // options: {
        //     // see https://github.com/mranney/node_redis#rediscreateclient
        // }
    }
});

q.app.listen(4322)

module.exports = {}
