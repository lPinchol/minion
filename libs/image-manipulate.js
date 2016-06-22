var prompt = require('prompt'),
    fs = require('fs'),
    PNGCrop = require('png-crop'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

var bar = require('./progressbar');

module.exports = {

  //resize the image
  ResizeImage: function (newImageName, newImgWidth, newImgHeight, dstPath, srcPath, outputQuality)
  {
    // make sure we are using ints
    var w = parseInt(newImgWidth);
    var h = parseInt(newImgHeight);

    //check if quality was changed
    if(outputQuality == null || outputQuality == 'undefined' || outputQuality == 0)
    {
      //set the max output quality
      outputQuality = 100;
    }

    // open a file called "lenna.png"
    Jimp.read(srcPath).then(function (lenna) {
        lenna.resize(w, h)            // resize
             .quality(outputQuality)                 // set png quality
             .write(dstPath + "/" + newImageName + "-resized" + ".png"); // save
             bar.tick();
    }).catch(function (err) {
        console.error(err.red);
    });


  },


  //crop the image
  CropImage: function (newImageName, newImgWidth, newImgHeight, dstPath, srcPath, imagequality, cropPosX, cropPosY)
  {

    Jimp.read(srcPath).then(function (lenna) {
        lenna.crop(parseInt(cropPosX), parseInt(cropPosY), parseInt(newImgWidth), parseInt(newImgHeight))
          .quality(imagequality)
          .write(dstPath + "/" + newImageName + "-cropped" + ".png");
          bar.tick();
    }).catch(function (err) {
        console.error(err);
    });
    //
    // //create a small config
    // var config2 = { width: newImgWidth, height: newImgHeight };
    // //get the image from disc
    // var imgBuffer = fs.readFileSync(srcPath);
    // //crop the image
    // PNGCrop.cropToStream(imgBuffer, config2, function(err, outputStream) {
    //   if (err) throw err;
    //   outputStream.pipe(fs.createWriteStream(dstPath + "/" + newImageName + "-cropped" + ".png"));
    //   bar.tick();
    // });

  }

};
