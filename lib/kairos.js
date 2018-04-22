var axios = require('axios');
var uniqid = require('uniqid');

//Kairos keys
let API_KEY = 'c7402d10c77d82ba3be8f4f600841e00'
let AP_ID = '77f9d26b';

//add headers for api_id and api_key
axios.defaults.headers.common['app_id'] = AP_ID;
axios.defaults.headers.common['app_key'] = API_KEY;

//store image url and name of gallery
let data2 = {};

setData('https://images.pexels.com/photos/63456/pexels-photo-63456.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'testGallery');
//recognize();
//listAllGalleries();
//viewGallery();
//removeFace('enfxe81m3jg9po5pw');
// callKairos(data2).then(function (response) {
//     console.log(JSON.stringify(response));
// })

viewGallery(data2).then(console.log);
//removeAllFaces();

function setData(image, gallery_name) {
    data2 = {
        image: image,
        gallery_name: gallery_name,
    }
}

async function callKairos(data) {
    const recognized = await recognize(data);
    if (recognized.Errors) {
        // check for 5004 error (gallery name doesn't exist on Kairos)
        for (let i = 0; i < recognized.Errors.length; i++) {
            //check for 5002 error (no face in the image)
            if (recognized.Errors[i].ErrCode === 5002) {
                return;
            }
        }
            await enroll(data);
            return await detect(data.image);
        }
        if (recognized.images) {
            if (recognized.images[0].transaction.message) {
                enroll(data);
            } else if (recognized.images.candidates) {
                return await detect(data.image);
            }
        }
        return await detect(data.image);
    }

    async function recognize(data) {
        let response;
        try {
            response = await axios.post('https://api.kairos.com/recognize', data)
        }
        catch (e) {
            console.log('Oh No! Error!');
            console.log(error)
        }
        console.log('RECOGNIZE SUCCESSFULL');
        //console.log(JSON.stringify(response.data));
        data2.subject_id = response.data.images[0].candidates[0].subject_id;
        //console.log(response.data.images[0].candidates[0].subject_id);
        return response.data;
    }

    async function enroll(data) {

        //create random subject_id to enroll a new candidate
        data.subject_id = uniqid();
        data2.subject_id = data.subject_id;
        let response;
        //perform post enroll request
        try {
            response = await axios.post('https://api.kairos.com/enroll', data);
        }
        catch (e) {
            console.log('Oh No! Error!');
            console.log(error);
        }
        if (response.data.Errors) {
            console.log("SOME ERRRORS ARE HERE, O NOOOO!");
            console.log(response.data.Errors);
            return;
        }
        console.log('ENROLL SUCCESSFULL');
        //console.log(response.data);
        return response.data;
    }

    function listAllGalleries() {

        axios.post('https://api.kairos.com/gallery/list_all')
            .then(response => {
                //checks for errors from Kairos
                if (response.data.Errors) {
                    console.log("SOME ERRRORS ARE HERE, O NOOOO!");
                    console.log(response.data.Errors);
                }
                console.log('post success');
                console.log(response.data);
            })
            .catch(error => {
                console.log('Oh No! Error!');
                console.log(error)
            })
    }

    async function viewGallery(data) {

        const { gallery_name } = data;
        let response;

        try {
            response = await axios.post('https://api.kairos.com/gallery/view', { gallery_name });
        }
        catch (e) {
            console.log('Oh No! Error!');
            console.log(e);
            return;
        }
        //checks for errors from Kairos
        if (response.data.Errors) {
            console.log("SOME ERRRORS ARE HERE, O NOOOO!");
            console.log(response.data.Errors);
            return;
        }
        console.log('VIEW GALLERY success');
        //console.log(response.data);
        return response.data.subject_ids;
    }

    async function removeFace(subject_id) {
        let response;
        try {
            response = await axios.post('https://api.kairos.com/gallery/remove_subject', { gallery_name: data2.gallery_name, subject_id: subject_id })
        }
        catch (e) {
            console.log('Oh No! Error!');
            console.log(error)
        }
        if (response.data.Errors) {
            console.log("SOME ERRRORS ARE HERE, O NOOOO!");
            console.log(response.data.Errors);
        }
        console.log('post success');
    }

    async function removeAllFaces() {

        let subjects_id_array = [];
        subjects_id_array.push(...await viewGallery());

        for (let i = 0; i < subjects_id_array.length; i++) {
            await removeFace(subjects_id_array[i]);
        }
    }

    async function detect(data) {
        let response;
        //console.log("DATA: ", data);
        try {
            response = await axios.post('https://api.kairos.com/detect', { image:data })
        }
        catch (e) {
            console.log('Oh No! Error!');
            console.log(error)
        }
        if (response.data.Errors) {
            console.log("SOME ERRRORS ARE HERE, O NOOOO!");
            console.log(response.data.Errors);
            //return response.data.Errors;
        }

        response.data.subject_id = data2.subject_id;
        return response.data;
    }