const fs = require('fs');

const Dotenv = require('dotenv');
Dotenv.config({ silent: true });

const { uploadService, mapFaces } = require('./lib/cloudinary');

const x = fs.readFileSync('img.txt').toString();

(async function () {

  const response = await uploadService(x);

  console.log(mapFaces(response));
})();
