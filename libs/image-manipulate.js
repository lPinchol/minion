var prompt = require('prompt'),
    fs = require('fs'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

var bar = require('./progressbar');

module.exports = {

  //resize the image
  ResizeImage: function (newImageName, newImgWidth, newImgHeight, dstPath, srcPath, outputQuality, exportimagetype)
  {
    // make sure we are using ints
    var w = parseInt(newImgWidth);
    var h = parseInt(newImgHeight);


    //check if the user passed a supported image type to export to
    if(exportimagetype.toLowerCase() != 'jpg' || exportimagetype.toLowerCase() != 'png')
    {
      exportimagetype = 'jpg';
    }

    //check if quality was changed
    if(outputQuality == null || outputQuality == 'undefined' || outputQuality == 0 || outputQuality > 100)
    {
      //set the max output quality
      outputQuality = 100;
    }

    // open a file called "lenna.png"
    Jimp.read(srcPath).then(function (lenna) {
        lenna.resize(w, h)            // resize
             .quality(outputQuality)                 // set quality
             .write(dstPath + "/" + newImageName + "-resized" + "." + exportimagetype); // save
             bar.tick();
    }).catch(function (err) {
        console.error(err.red);
    });


  },


  //crop the image
  CropImage: function (newImageName, newImgWidth, newImgHeight, dstPath, srcPath, imagequality, cropPosX, cropPosY, exportimagetype)
  {

    //check if quality was changed
    if(imagequality == null || imagequality == 'undefined' || imagequality == 0 || imagequality > 100)
    {
      //set the max output quality
      imagequality = 100;
    }

    //check if the user passed a supported image type to export to
    if(exportimagetype.toLowerCase() != 'jpg' || exportimagetype.toLowerCase() != 'png')
    {
      exportimagetype = 'jpg';
    }

    Jimp.read(srcPath).then(function (lenna) {
        lenna.crop(parseInt(cropPosX), parseInt(cropPosY), parseInt(newImgWidth), parseInt(newImgHeight))
          .quality(imagequality)
          .write(dstPath + "/" + newImageName + "-cropped" + "." + exportimagetype);
          bar.tick();
    }).catch(function (err) {
        console.error(err);
    });

  }

};
