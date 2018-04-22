var axios = require('axios');
var uniqid = require('uniqid');

//Kairos keys
const { KAIROS_API_KEY, KARIOS_AP_ID } = process.env;

// Add headers for api_id and api_key

const http = axios.create({

    baseURL: 'https://api.kairos.com',
    headers: {
        app_id: KAIROS_API_KEY,
        app_key: KARIOS_AP_ID,
    }
});

async function callKairos(data) {

    try {

        const recognized = await recognize(data);
    }
    catch (e) {

        console.log('Response Error!');
        console.log(e);
        return false
    }

    let subject;

    if (recognized.Errors) {

        // check for 5004 error (gallery name doesn't exist on Kairos)
        for (let i = 0; i < recognized.Errors.length; i++) {

            //check for 5002 error (no face in the image)
            if (recognized.Errors[i].ErrCode === 5002) {

                return false;
            }
        }

        subject = await enroll(data);
    }

    if (recognized.images) {

        if (recognized.images[0].transaction.message) {

            subject = await enroll(data);
        }
    }

    const detected = await detect(data.image);

    return { recognized, subject, detected };
}

async function recognize(data) {

    let response;

    try {

        response = await http.post('/recognize', data)
    } catch (e) {

        console.log(e);
        return false;
    }

    return response.data;
}

async function enroll(data) {

    let response;

    data.subject_id = uniqid();

    //perform post enroll request
    try {

        response = await http.post('/enroll', data);
    } catch (e) {

        console.log('Request Failed!');
        console.log(e);
    }

    if (response.data.Errors) {

        console.log('Enroll Failed!');
        console.log(response.data.Errors);
        return false;
    }

    return response.data;
}

async function listAllGalleries() {

    let response;

    try {

        response = await http.post('/gallery/list_all');
    } catch (e) {

        console.log('Request Error!');
        console.log(e)
    }

    if (response.data.Errors) {

        console.log("List Gallery Error!");
        console.log(response.data.Errors);
    }

    return response.data;
}

async function viewGallery(data) {

    const { gallery_name } = data;
    let response;

    try {

        response = await http.post('/gallery/view', { gallery_name });
    } catch (e) {

        console.log('Request Error!');
        console.log(e);
        return;
    }

    //checks for errors from Kairos
    if (response.data.Errors) {

        console.log("View Gallery Error!");
        console.log(response.data.Errors);
        return;
    }

    return response.data.subject_ids;
}

async function removeFace({ subject_id, gallery_name }) {

    let response;

    try {

        response = await http.post('/gallery/remove_subject', { gallery_name, subject_id });
    } catch (e) {

        console.log("Response Error!");
        console.log(e);
    }

    if (response.data.Errors) {

        console.log("Remove Subject Error!");
        console.log(response.data.Errors);
    }

    return response.data;
};

async function removeAllFaces() {

    const subjects = await viewGallery();

    subjects.forEach(async (subject) => {

        await removeFace(subject);
    });
};

async function detect({ image }) {

    let response;

    try {

        response = await http.post('/detect', { image });
    } catch (e) {

        console.log('Response Error!');
        console.log(e);
    }
    if (response.data.Errors) {

        console.log('Detect Error!');
        console.log(response.data.Errors);
        return false;
    }

    return response.data;
};

module.exports = {

    callKairos,
    recognize,
    enroll,
    listAllGalleries,
    viewGallery,
    removeFace,
    removeAllFaces,
    detect
};
