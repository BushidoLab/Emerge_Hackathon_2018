'use strict';

const Pkg = require('./package.json');
const Server = require('./index');

const startServer = async function () {

    try {

        const server = await Server();
        await server.start();

        console.log(`${Pkg.name} started on port ${server.settings.port}`);

        return server;
    }
    catch (e) {

        console.log(e);
        process.exit(1);
    }
};

const server = startServer();

module.exports = server;
