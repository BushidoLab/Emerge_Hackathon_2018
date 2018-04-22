const fs = require('fs');
const axios = require('axios');
const formData = require('form-data');

const Dotenv = require('dotenv');
Dotenv.config({ silent: true });

const { CLOUDINARY_NAME, CLOUDINARY_UPLOAD_PRESET } = process.env;

(async function() {

    const file = fs.readFileSync('img.jpg').toString('base64');

    // const file = fs.createReadStream('img.jpg');
    // const form = new formData();

    // form.append('file', file);

    let response

    try {
        response = await axios.post('http://localhost:4321/upload', { file });

        // response = await form.submit('http://localhost:4321/upload');
    }
    catch (e) {

        console.log(e.message);
    }

    console.log(response);
})()
