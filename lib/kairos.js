var axios = require('axios');
var uniqid = require('uniqid');

//Kairos keys
const {
    KAIROS_API_KEY,
    KAIROS_APP_ID
} = process.env;

// Add headers for api_id and api_key

//http.defaults.headers.post['app_id'] = KAIROS_API_KEY // for POST requests
//http.defaults.headers.post['app_key'] = KARIOS_AP_ID // for POST requests
const http = axios.create({

    baseURL: 'https://api.kairos.com',
    headers: {
        common: {
            "Content-Type": "application/json",
            "app_id": KAIROS_APP_ID,
            "app_key": KAIROS_API_KEY,
        }
    }
});

//console.log(http.defaults);

async function callKairos(data) {
    let recognized;

    try {

        recognized = await recognize(data);
        //console.log(recognized);
        //process.exit();
    } catch (e) {

        console.log('Response Error!');
        console.log(e);
        return false;
    }

    let subject;
    let detected;

    if (recognized && recognized.Errors) {
        // check for 5004 error (gallery name doesn't exist on Kairos)
        for (let i = 0; i < recognized.Errors.length; i++) {

            //check for 5002 error (no face in the image)
            if (recognized.Errors[i].ErrCode === 5002) {

                return false;
            }
        }

        subject = await enroll(data);

        if (subject && subject.images.length) {

            subject = subject.images[0].subject_id;
        }
        else {

            subject = recognized.images[0].transaction.subject_id
        }

        const emotion = await emotions(data.image);

        return {
            recognized,
            subject,
            emotion,
            detected
        };
    }

    if (recognized.images && recognized.images.length) {

        //no face match in the Kairos database
        if (recognized.images[0].transaction.message) {

            subject = await enroll(data);
        }


        detected = await detect(data);

        if (subject) {

            subject = subject.images[0].subject_id;
        } else {

            subject = recognized.images[0].transaction.subject_id
        }
    }

    const emotion = await emotions(data.image);

    return {
        emotion,
        recognized,
        subject,
        detected
    };
}

async function recognize(data) {
    //console.log("recongnised")
    //console.log(data);
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
    //console.log("enroll")
    //console.log(data);

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
    response.data.subject = data.subject_id;
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

    const {
        gallery_name
    } = data;
    let response;

    try {

        response = await http.post('/gallery/view', {
            gallery_name
        });
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

async function removeFace({
    subject_id,
    gallery_name
}) {

    let response;

    try {

        response = await http.post('/gallery/remove_subject', {
            gallery_name,
            subject_id
        });
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

async function detect({ image, gallery_name }) {

    console.log("detect")
    console.log({
        image,
        gallery_name
    });
    let response;

    try {

        response = await http.post('/detect', {
            image,
            gallery_name
        });
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

async function emotions(image) {

    console.log("get emotions");

    //console.log(image);
    let response;
    //let image2 = 'https://i.pinimg.com/originals/b5/d9/eb/b5d9eb0e46f23861a80be8fef8a2c308.jpg';
    console.log(image);
    try {
        response = await http.post(`/v2/media?source=${image}.jpg`);
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
// callKairos({
//     image: 'https://qz.com/wp-content/uploads/2015/09/rtr4n4v3.jpg?quality=80&strip=all',
//     gallery_name: 'testGallery'
// }).then(console.log);

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
