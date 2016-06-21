var fs = require('fs'),
    PNGCrop = require('png-crop'),
    Jimp = require("jimp");

//set the args
var srcPath = process.argv[2];
var dstPath = process.argv[3];
var newImgWidth = process.argv[4];
var newImgHeight = process.argv[5];


// printArgs();
// ResizeImage();
// CropImage();



function ResizeImage()
{
  // make sure we are using ints
  var w = parseInt(newImgWidth);
  var h = parseInt(newImgHeight);

  // open a file called "lenna.png"
  Jimp.read(srcPath).then(function (lenna) {
      lenna.resize(w, h)            // resize
           .quality(60)                 // set png quality
           .write(dstPath + "/reizedimage.png"); // save
  }).catch(function (err) {
      console.error(err);
  });

}

function CropImage() {

  //create a small config
  var config2 = {width: newImgWidth, height: newImgHeight};
  //get the image from disc
  var imgBuffer = fs.readFileSync(srcPath);
  //crop the image
  PNGCrop.cropToStream(imgBuffer, config2, function(err, outputStream) {
    if (err) throw err;
    outputStream.pipe(fs.createWriteStream(dstPath + '/croppedimage.png'));
    console.log("Crop Complete: dstPath");
  });

}

function printArgs()
{
  for (var i = 0; i < process.argv.length; i++) {
    console.log('arg' + i + ": " + process.argv[i]);
  }
}
