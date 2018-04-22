const fs = require('fs');

const Dotenv = require('dotenv');
Dotenv.config({ silent: true });

const payload = {

    "image": 'https://qz.com/wp-content/uploads/2015/09/rtr4n4v3.jpg?quality=80&strip=all',
    "gallery_name": 'testGallery8'
};

const { callKairos, recognize } = require('./lib/kairos');
const { uploadService, mapFaces } = require('./lib/cloudinary');

const x = fs.readFileSync('img.txt').toString();

(async function () {

    const response = await uploadService(x);
    const faceURLs = mapFaces(response);

    const detected = faceURLs.map(async (image) => {

        const response = await callKairos(Object.assign({}, payload, { image }));
        console.log(response);
        return response;
    });


})();

