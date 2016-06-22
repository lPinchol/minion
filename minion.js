var prompt = require('prompt'),
    fs = require('fs'),
    PNGCrop = require('png-crop'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

//get all the tools needed for steam
var image = require('./libs/image-manipulate');
var tradingcards = require('./platforms/steam/tradingcards');
var badges = require('./platforms/steam/badges');
var iosscreenshots = require('./platforms/ios/device-screenshots');

//create a progress bar
var bar;

//
// Start the prompt
//
prompt.start();

//display the selections here
console.log('Select One [Long Name] - [Short Name]: \n'.blue +
            'crop - c, \n'.blue +
            'resize - r \n'.blue +
            'steam-trading-card - stc \n'.blue +
            'badges - b \n'.blue +
            'ios-vertical - iosv \n'.blue +
            'profile-background - pb'.blue);

prompt.get(['Type'], function (err, result)
{

  if(result.Type == 'c' || result.Type == 'crop')
  {
    console.log('<- Crop Image ->'.blue);
    console.log('Pressing Control+C cancels the Multiple ImageSource Prompts'.blue);
    PromptCropImage();
  }

  if(result.Type == 'r' || result.Type == 'resize')
  {
    console.log('<- Resize Image ->'.blue);
    console.log('Pressing Control+C cancels the Multiple ImageSource Prompts'.blue);
    PromptResizeImage();
  }

  if(result.Type == 'ios-vertical' || result.Type == 'iosv')
  {
    console.log('<- iOS Vertical Resize Image ->'.blue);
    console.log('Pressing Control+C cancels the Multiple ImageSource Prompts'.blue);
    iosscreenshots.ResizeFullscreenPortrait();
  }

});


function PromptResizeImage()
{
  var TypeSchema = {
      properties: {
        ImageName: {
          type: 'string',
          required: true
        },
        Width: {
          type: 'integer',
          required: true
        },
        Height: {
          type: 'integer',
          required: true
        },
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
      //set the bar length
      bar = new ProgressBar('Resizing [:bar]', { total:  result.ImageSource.length, width: 50});

      //iterate through the array of images and resize them all
      for (var i = 0; i < result.ImageSource.length; i++)
      {

        image.ResizeImage(result.ImageName.toString().replace(/ /g,'') + i,
                  result.Width.toString().replace(/ /g,''),
                  result.Height.toString().replace(/ /g,''),
                  result.Destination.toString().replace(/ /g,''),
                  result.ImageSource[i].toString().replace(/ /g,''));
        //tick the progress bar
        bar.tick();
        checkIfProgressBarCompleted();

      }

    });

}

function PromptCropImage()
{
  var TypeSchema = {
      properties: {
        ImageName: {
          type: 'string',
          required: true
        },
        Width: {
          type: 'integer',
          required: true
        },
        Height: {
          type: 'integer',
          required: true
        },
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


  //
  // Get What Item The User Wants To Make
  //
  prompt.get(TypeSchema, function (err, result)
  {
    //set the bar length
    bar = new ProgressBar('Cropping [:bar]', { total:  result.ImageSource.length, width: 50});

    // iterate through the array of images and resize them all
    for (var i = 0; i < result.ImageSource.length; i++)
    {
      image.CropImage(result.ImageName.toString().replace(/ /g,'') + i,
                result.Width.toString().replace(/ /g,''),
                result.Height.toString().replace(/ /g,''),
                result.Destination.toString().replace(/ /g,''),
                result.ImageSource[i].toString().replace(/ /g,''));
      //tick the progress bar
      bar.tick();
      checkIfProgressBarCompleted();

    }
  });
}

//checks is a path is a directory or not
function isDirectory(path)
{
  if(fs.lstatSync(path).isDirectory() == true)
  {
    return true;
  }
  else {
    return false;
  }
}

//checks is a path is a file or not
function isFile(path)
{
  if(fs.lstatSync(path).isFile() == true)
  {
    return true;
  }
  else {
    return false;
  }
}

//makes a directory from a given path
function makeDirectory(path)
{
  try {
      fs.mkdirSync(path);
  } catch(e)
  {
    if ( e.code != 'EEXIST' )
    {
      throw e.red;
    }
  }
}

function checkIfProgressBarCompleted()
{
  if (bar.complete)
  {
    console.log('\ncompleted Resizing\n');
  }
}
