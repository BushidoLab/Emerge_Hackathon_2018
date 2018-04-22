'use strict';

const { uploadService, mapFaces } = require('./cloudinary');


module.exports = function (server) {

    return [
        {
            method: 'POST',
            path: '/upload',
            handler: async (request, h) => {

                const { file } = request.payload;

                const response = await uploadService(file);
                const faceURLs = mapFaces(response);

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
