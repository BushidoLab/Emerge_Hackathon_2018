const fs = require('fs');

const Dotenv = require('dotenv');
Dotenv.config({ silent: true });

const payload = {

    image: 'https://qz.com/wp-content/uploads/2015/09/rtr4n4v3.jpg?quality=80&strip=all',
    gallery_name: 'testGallery'
};

const { callKairos, recognize } = require('./lib/kairos');
// const { uploadService, mapFaces } = require('./lib/cloudinary');

// const x = fs.readFileSync('img.txt').toString();

// (async function () {

//     const response = await uploadService(x);
//     const faceURLs = mapFaces(response);
//     console.log(faceURLs.map(async (image) => {
//         console.log(image);
//         return await callKairos(Object.assign({}, payload, { image }));
//     }));
// })();

recognize(payload).then(console.log);
