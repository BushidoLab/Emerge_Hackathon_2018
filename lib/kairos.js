var axios = require('axios');
var uniqid = require('uniqid');

//Kairos keys
let API_KEY = 'c7402d10c77d82ba3be8f4f600841e00'
let AP_ID = '77f9d26b';

//add headers for api_id and api_key
axios.defaults.headers.common['app_id'] = AP_ID;
axios.defaults.headers.common['app_key'] = API_KEY;

//store image url and name of gallery
let data = {};

setData('https://i.pinimg.com/originals/94/90/8e/94908e63d81b9f0921526f43d94cc4c9.png', 'testGallery');
//recognize();
//listAllGalleries();
//viewGallery();
//removeFace('enfxe81m3jg9po5pw');
callKairos(data).then(console.log);
//viewGallery().then(console.log);
//removeAllFaces();

function setData(image, gallery_name) {
    data = {
        image: image,
        gallery_name: gallery_name,
    }
}
async function callKairos(data) {
    const recognized = await recognize(data);
    //console.log(recognized.images.candidates);
    //console.log(recognized);
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
            //     }
            //     if (response.data.Errors[i].ErrCode === 5004) {
            //         console.log('inside if statement')
            //         return;
            //     }
            // }
        }
        if (recognized.images) {
            if (recognized.images[0].transaction.message) {
                enroll(data);
            } else if (recognized.images.candidates) {
                console.log("inside this shit");
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
        //console.log(response.data.images);
        return response.data.images;
    }

    async function enroll(data) {

        //create random subject_id to enroll a new candidate
        data.subject_id = uniqid();
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

    async function viewGallery() {

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
            response = await axios.post('https://api.kairos.com/gallery/remove_subject', { gallery_name: data.gallery_name, subject_id: subject_id })
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

        //console.log("Inside remove all faces function:")
        //console.log(subjects_id_array);
        for (let i = 0; i < subjects_id_array.length; i++) {
            //console.log(subjects_id_array[i]);
            //console.log(i);
            await removeFace(subjects_id_array[i]);
        }
    }

    async function detect(data) {
        let response;
        console.log("DATA: ", data);
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
        return response.data;
    }