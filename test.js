const fs = require('fs');

const Dotenv = require('dotenv');
Dotenv.config({ silent: true });

const payload = {

    image: 'image',
    gallery_name: 'testGallery'
};

const { callKairos } = require('./lib/kairos');
const { uploadService, mapFaces } = require('./lib/cloudinary');

const x = fs.readFileSync('img.txt').toString();

(async function () {

    const response = await uploadService(x);
    const faceURLs = mapFaces(response);

    console.log(faceURLs.map(async (image) => {
        console.log(image);
        return await callKairos(Object.assign({}, payload, { image }));
    }));
})();
