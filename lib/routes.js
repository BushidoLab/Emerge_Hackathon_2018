'use strict';

const { uploadService, mapFaces } = require('./cloudinary');
const worker = require('./worker');
const fs = require('fs');

module.exports = function (server) {

    return [
        {
            method: 'POST',
            path: '/upload',
            config: {

                payload: {
                    // parse: false,
                    maxBytes: Number.MAX_SAFE_INTEGER
                }
            },
            handler: async (request, h) => {

                worker('url');

                let faceURLs;

                try {

                    const response = await uploadService(request.payload);
                    faceURLs = mapFaces(response);
                }
                catch (e) {

                    console.log(e.message);
                }

                return faceURLs;
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
