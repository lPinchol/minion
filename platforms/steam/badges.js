var prompt = require('prompt'),
    fs = require('fs'),
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

        console.log('80x80px PNGs with a transparent background.');
        //setup the progress bar
        //Multipied by 2 for the cropping and resizing processes
        bar.setup('Steam Badges', result.ImageSource.length);

        //Make the actual badge images
        // 80x80px PNGs with a transparent background.
        for (var i = 0; i < result.ImageSource.length; i++)
        {

          image.ResizeImage("Small-Card-Images-"  + i,
                    80,
                    80,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''));
        }

        bar.isComplete();

      });

  }

};
