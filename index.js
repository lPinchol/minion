var fs = require('fs'),
    PNGCrop = require('png-crop');

//set the args
var srcPath = process.argv[2];
var dstPath = process.argv[3];
var newImgWidth = process.argv[4];
var newImgHeight = process.argv[5];
//create a small config
var config2 = {width: newImgWidth, height: newImgHeight};
//get the image from disc
var imgBuffer = fs.readFileSync(srcPath);
//crop the image
PNGCrop.cropToStream(imgBuffer, config2, function(err, outputStream) {
  if (err) throw err;
  outputStream.pipe(fs.createWriteStream(dstPath));
  console.log("Crop Complete: dstPath");
});