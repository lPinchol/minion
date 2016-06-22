var prompt = require('prompt'),
    fs = require('fs'),
    PNGCrop = require('png-crop'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');


module.exports = {

  //resize the image
  ResizeImage: function (newImageName, newImgWidth, newImgHeight, dstPath, srcPath)
  {
    // make sure we are using ints
    var w = parseInt(newImgWidth);
    var h = parseInt(newImgHeight);

    // open a file called "lenna.png"
    Jimp.read(srcPath).then(function (lenna) {
        lenna.resize(w, h)            // resize
             .quality(100)                 // set png quality
             .write(dstPath + "/" + newImageName + "-resized" + ".png"); // save
    }).catch(function (err) {
        console.error(err.red);
    });


  },


  //crop the image
  CropImage: function (newImageName, newImgWidth, newImgHeight, dstPath, srcPath)
  {

    //create a small config
    var config2 = { width: newImgWidth, height: newImgHeight };
    //get the image from disc
    var imgBuffer = fs.readFileSync(srcPath);
    //crop the image
    PNGCrop.cropToStream(imgBuffer, config2, function(err, outputStream) {
      if (err) throw err;
      outputStream.pipe(fs.createWriteStream(dstPath + "/" + newImageName + "-cropped" + ".png"));

    });

  }

};
