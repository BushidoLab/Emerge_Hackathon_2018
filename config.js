'use strict';

// Logging module
const goodOpts = {

    ops: {

        interval: 1000
    },
    reporters: {

        console: [{

            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*', error: '*' }]
        }, {

            module: 'good-console'
        }, 'stdout']
    }
};

const plugins = [

    { plugin: require('good'), options: goodOpts },
    { plugin: require('blipp') }
];

const server = {

    debug: { log: ['debug'] },
    port: 4321,
    host: 'localhost',
    routes: { cors: true }
};


module.exports = { plugins, server };
