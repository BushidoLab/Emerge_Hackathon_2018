'use strict';

module.exports = function (server) {

    return [
        {
            method: 'POST',
            path: '/upload',
            handler: async (request, h) => {


                return 'ok!'
            }
        },
        {
            method: 'GET',
            path: '/data',
            handler: async (request, h) => {

                return []
            }
        }
    ];
};
