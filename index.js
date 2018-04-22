'use strict';

const Path = require('path');
const Dotenv = require('dotenv');
const Hapi = require('hapi');

const Config = require('./config');
const Routes = require('./lib/routes');

Dotenv.config({ silent: true });

const server = new Hapi.Server(Config.server);

module.exports = async function () {

    await server.register(Config.plugins);

    server.route(Routes(server));
    return server;
};


