// Steam Trading Card Creator
// Documentation: https://partner.steamgames.com/documentation/tradingcards
// This will take a series of pictures and perform the following:
// 1. Resize to 1920x1080px
// 2. Duplicate Images from #1
// 3. Crop the Duplicated images from the center to 206x184px
// 4. Outputs them all to a folder for uploading to Steam backend

var prompt = require('prompt'),
    fs = require('fs'),
    PNGCrop = require('png-crop'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

var image = require('../../libs/image-manipulate'),
    bar = require('../../libs/progressbar'),
    utils = require('../../libs/utils');


module.exports = {

  Create: function() {

    var TypeSchema = {
        properties: {
          Destination: {
            type: 'string',
            required: true
          },
          ImageSource: {
            type: 'array',
            required: true
          }
        }
      };

      prompt.get(TypeSchema, function (err, result)
      {
        //setup the progress bar
        //Multipied by 2 for the cropping and resizing processes
        bar.setup('Steam Trading Cards ', result.ImageSource.length * 2);

        // Make the Large Images for the trading cards when they are clicked
        //iterate through the array of images and resize them all
        for (var i = 0; i < result.ImageSource.length; i++)
        {

          image.ResizeImage("Large-Card-Images-"  + i,
                    1920,
                    1080,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''));
        }

        //Make the actual badge images
        for (var i = 0; i < result.ImageSource.length; i++)
        {

          image.ResizeImage("Small-Card-Images-"  + i,
                    206,
                    184,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''));
        }

        bar.isComplete();

      });

  }

};
