'use strict';

const Kue = require('kue');

const { REDIS_PORT, REDIS_HOST } = process.env;

const q = Kue.createQueue({

    prefix: 'q',
    redis: {
        // port: REDIS_PORT*1,
        host: 'emergehackathoncache.lbsmon.0001.use1.cache.amazonaws.com',
        // auth: 'password',
        // db: 3, // if provided select a non-default redis db
        // options: {
        //     // see https://github.com/mranney/node_redis#rediscreateclient
        // }
    }
});


Kue.app.listen(4322)


q.process('processKairos', function(job, done){

    console.log("PROCESSING KAIROS BRO");
    done();
});


module.exports = function (url) {

    const job = q.create('processKairos', url)
        .removeOnComplete(true)
        .save(function (err) {

            if (!err) {

                console.log(`Processing thumbnail ${url} on job ${job.id}`);
            }
        });
}
