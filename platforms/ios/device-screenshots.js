// usage
// // main.js
// var greetings = require("./greetings.js");
//
// // "Hello"
// greetings.sayHelloInEnglish();
//
// // "Hola"
// greetings.sayHelloInSpanish();
var prompt = require('prompt'),
    fs = require('fs'),
    PNGCrop = require('png-crop'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

var image = require('../../libs/image-manipulate');
var bar = require('../../libs/progressbar');

module.exports = {


  ResizeFullscreenPortrait: function() {

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
        bar.setup('iOS Resizing', result.ImageSource.length * 6);

        // 3.5 inch
        //iterate through the array of images and resize them all
        for (var i = 0; i < result.ImageSource.length; i++)
        {
          // 960 x 640 pixels for hi-res landscape (full screen) maximum
          image.ResizeImage("3-5-Inch-Retina-Display-"  + i,
                    640,
                    960,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''));
        }

        //4 inch
        // 640 x 1136 pixels for portrait (full screen) maximum
        for (var i = 0; i < result.ImageSource.length; i++)
        {
          image.ResizeImage("4-Inch-Retina-Display-"  + i,
                    640,
                    1136,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''));
        }

        // 4.7-inch Retina screenshot
        // 750 x 1334 pixels for hi-res portrait
        for (var i = 0; i < result.ImageSource.length; i++)
        {
          image.ResizeImage("4-7-Inch-Retina-Display-"  + i,
                    750,
                    1334,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''));
        }

        // 5.5 inch
        // 1242 x 2208
        for (var i = 0; i < result.ImageSource.length; i++)
        {
          image.ResizeImage("5-5-Inch-Retina-Display-"  + i,
                    1242,
                    2208,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''));
        }

        // iPad Screenshots
        // 1536 x 2048 pixels for hi-res portrait (full screen) maximum
        for (var i = 0; i < result.ImageSource.length; i++)
        {
          image.ResizeImage("iPad-"  + i,
                    1536,
                    2048,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''));
        }

        // iPad Pro Screenshots
        // 2048 x 2732 pixels for hi-res portrait
        for (var i = 0; i < result.ImageSource.length; i++)
        {
          image.ResizeImage("iPad-Pro-"  + i,
                    2048,
                    2732,
                    result.Destination.toString().replace(/ /g,''),
                    result.ImageSource[i].toString().replace(/ /g,''));
        }

        bar.isComplete();

      });

  }

};
