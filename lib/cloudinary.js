'use strict';

const fs = require('fs');
const Axios = require('axios');

const { CLOUDINARY_NAME, CLOUDINARY_UPLOAD_PRESET } = process.env;

const uploadURL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`;

const mapFaces = function ({ faces, public_id }) {

    return faces.map((face) => {

        const [ x, y, w, h ] = face;
        return `https://res.cloudinary.com/dxjyu9wev/image/upload/x_${x},y_${y},w_${w},h_${h},c_crop/${public_id}`
    });
};

const uploadService = async function (file) {
    let response;

    try {

        const { data } = await Axios.post(uploadURL, {
            upload_preset: CLOUDINARY_UPLOAD_PRESET,
            tags: 'app_upload',
            file
        });

        response = data;
    }
    catch (e) {

        throw e;
    }

    const { secure_url, public_id, faces } = response;

    return { public_id, faces };
};

module.exports = { uploadService, mapFaces };
