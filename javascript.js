const cloudName = 'dxjyu9wev';
const unsignedUploadPreset = 'clyg3ajp';

var fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", function(e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

// ************************ Drag and drop ***************** //
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  handleFiles(files);
}

// *********** Upload file to Cloudinary ******************** //
function uploadFile(file) {
  var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  console.log(url);

  // Reset the upload progress bar
   document.getElementById('progress').style.width = 0;

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    var progress = Math.round((e.loaded * 100.0) / e.total);
    document.getElementById('progress').style.width = progress + "%";

    console.log(`fileuploadprogress data.loaded: ${e.loaded},
  data.total: ${e.total}`);
  });

  xhr.onreadystatechange = function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // File uploaded successfully
      var response = JSON.parse(xhr.responseText);
      // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
      var url = response.secure_url;
      // Create a thumbnail of the uploaded image, with 150px width
      var tokens = url.split('/');
      tokens.splice(-2, 0, 'w_150,c_scale');
      var img = new Image(); // HTML5 Constructor
      img.src = tokens.join('/');
      img.alt = response.public_id;
      document.getElementById('gallery').appendChild(img);

      var imageName = `${img.alt}.jpg`
      console.log(imageName);

      // document.getElementById('croppedImage').append(
      //   `
      //     https://res.cloudinary.com/dxjyu9wev/image/upload/w_100,h_100,c_thumb,g_faces/${imageName}
      //   `
      // );
      // document.getElementById('croppedImage').append($.cloudinary.url(imageName, {width: 300, height: 100, crop: "scale"}))

      var tagToAppend = `https://res.cloudinary.com/dxjyu9wev/image/upload/w_100,h_100,c_thumb,g_faces/${imageName}`
      // document.getElementById('croppedImage').append(tagToAppend).toHtml();


      $('#croppedImage').prepend($('<img>',{id:'theImg',src:tagToAppend}));
      var faceList = [];
      faceList = response.faces;
      console.log(faceList);
      // console.log(faceList[1]);
      // console.log(faceList[2]);
      // console.log(faceList[3]);
    }
  };

  fd.append('upload_preset', unsignedUploadPreset);
  fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
  fd.append('file', file);
  xhr.send(fd);
}

// *********** Handle selected files ******************** //
var handleFiles = function(files) {
  for (var i = 0; i < files.length; i++) {
    // cloudinary.imageTag(files[i],{width: 100, height: 100, gravity: "faces", crop: "thumb"}).toHtml();
    uploadFile(files[i]); // call the function to upload the file
  }
};

$('#cropButton').click(function(){
  let file = document.getElementById('theImg');
  console.log(file.src);
  // handleFiles(file);
});

// cloudinary.imageTag('couple.jpg', {width: 100, height: 100, gravity: "faces", crop: "thumb"}).toHtml();
