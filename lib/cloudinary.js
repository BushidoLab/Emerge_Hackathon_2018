'use strict';


module.exports = function ({ faceList, imageName }) {

    return faceList.map((face) => {

        const [ x, y, w, h ] = face;
        return `https://res.cloudinary.com/dxjyu9wev/image/upload/x_${x},y_${y},w_${w},h_${h},c_crop/${imageName}`
    });
};
