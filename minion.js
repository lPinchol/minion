var prompt = require('prompt'),
    fs = require('fs'),
    PNGCrop = require('png-crop'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');


//create a progress bar
var bar;

//
// Start the prompt
//
prompt.start();

//display the selections here
console.log('Select One [Long Name] - [Short Name]: \n crop - c, resize - r, steam-trading-card - stc, badges - b, profile-background - pb'.blue);
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

        ResizeImage(result.ImageName.toString().replace(/ /g,'') + i,
                  result.Width.toString().replace(/ /g,''),
                  result.Height.toString().replace(/ /g,''),
                  result.Destination.toString().replace(/ /g,''),
                  result.ImageSource[i].toString().replace(/ /g,''));

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
      CropImage(result.ImageName.toString().replace(/ /g,'') + i,
                result.Width.toString().replace(/ /g,''),
                result.Height.toString().replace(/ /g,''),
                result.Destination.toString().replace(/ /g,''),
                result.ImageSource[i].toString().replace(/ /g,''));
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

//resize the image
function ResizeImage(newImageName, newImgWidth, newImgHeight, dstPath, srcPath)
{
  // make sure we are using ints
  var w = parseInt(newImgWidth);
  var h = parseInt(newImgHeight);

  makeDirectory(dstPath + "/" + newImageName);

  // open a file called "lenna.png"
  Jimp.read(srcPath).then(function (lenna) {
      lenna.resize(w, h)            // resize
           .quality(100)                 // set png quality
           .write(dstPath + "/" + newImageName + "/" + newImageName + "-resized" + ".png"); // save

          //tick the progress bar
          bar.tick();
          checkIfProgressBarCompleted();

  }).catch(function (err) {
      console.error(err.red);
  });


}

//crop the image
function CropImage(newImageName, newImgWidth, newImgHeight, dstPath, srcPath) {

  makeDirectory(dstPath + "/" + newImageName);

  //create a small config
  var config2 = { width: newImgWidth, height: newImgHeight };
  //get the image from disc
  var imgBuffer = fs.readFileSync(srcPath);
  //crop the image
  PNGCrop.cropToStream(imgBuffer, config2, function(err, outputStream) {
    if (err) throw err;
    outputStream.pipe(fs.createWriteStream(dstPath + "/" + newImageName + "/" + newImageName + "-cropped" + ".png"));

    //tick the progress bar
    bar.tick();
    checkIfProgressBarCompleted();

  });

}

function checkIfProgressBarCompleted()
{
  if (bar.complete)
  {
    console.log('\ncompleted Resizing\n');
  }
}
