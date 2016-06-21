var fs = require('fs'),
    PNGCrop = require('png-crop'),
    Jimp = require("jimp");

//set the args

//the src of the image we need to manipulate
var type = process.argv[2].toLowerCase();
var srcPath = process.argv[3];
//the output folder
var dstPath = process.argv[4];
//the new image size
var newImgWidth = process.argv[5];
var newImgHeight = process.argv[6];
//new image name
var newImageName = process.argv[7];
//the position in the image to crop from
var newImgXPos = process.argv[8];
var newImgYPos = process.argv[9];

var isValidated = false;

//check if the srcpath and dstpath are correct
validatePaths();

if(type == "crop" || type == "c")
{
  if(validatePaths)
  {
    CropImage();
  }
}

// printArgs();
// ResizeImage();
// CropImage();

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
    if(isDirectory(path))
    {
      fs.mkdirSync(path);
    }
    else {
      console.log('Not a Directory path');
    }
  } catch(e)
  {
    if ( e.code != 'EXIST' ) throw e;
  }
}

//resize the image
function ResizeImage()
{
  // make sure we are using ints
  var w = parseInt(newImgWidth);
  var h = parseInt(newImgHeight);

  // open a file called "lenna.png"
  Jimp.read(srcPath).then(function (lenna) {
      lenna.resize(w, h)            // resize
           .quality(60)                 // set png quality
           .write(dstPath + "/" + newImageName + ".png"); // save
  }).catch(function (err) {
      console.error(err);
  });

}

//crop the image
function CropImage() {

  //create a small config
  var config2 = {width: newImgWidth, height: newImgHeight};
  //get the image from disc
  var imgBuffer = fs.readFileSync(srcPath);
  //crop the image
  PNGCrop.cropToStream(imgBuffer, config2, function(err, outputStream) {
    if (err) throw err;
    outputStream.pipe(fs.createWriteStream(dstPath + "/" + newImageName + ".png"));
    console.log("Crop Complete: dstPath");
  });

}

function printArgs()
{
  for (var i = 0; i < process.argv.length; i++) {
    console.log('arg' + i + ": " + process.argv[i]);
  }
}

function validatePaths()
{
  var directoryCheck = false;
  var fileCheck = false;

  if(isDirectory(dstPath) == true)
  {
    directoryCheck = true;
  }
  else
  {
      console.log('dstPath is not valid');
  }

  if(isFile(srcPath) == true)
  {
    fileCheck = true;
  }
  else
  {
      console.log('srcPath is not valid');
  }

  if(directoryCheck == true && fileCheck == true)
  {
    isValidated = true;
    console.log('Validated Paths');
  }

}
