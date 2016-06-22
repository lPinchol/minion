// a set of utility methods

var prompt = require('prompt'),
    fs = require('fs'),
    PNGCrop = require('png-crop'),
    Jimp = require("jimp"),
    colors = require('colors'),
    ProgressBar = require('progress');

module.exports = {

  getFilesizeInBytes: function (filename) {
     var stats = fs.statSync(filename)
     var fileSizeInBytes = stats["size"]
     return fileSizeInBytes;
  },

  getFilesizeInKilobytes: function (filename) {
     var stats = fs.statSync(filename)
     var fileSizeInBytes = stats["size"]
     return fileSizeInBytes / 1024;
  },

  getFilesizeInMegabytes: function (filename) {
     var stats = fs.statSync(filename)
     var fileSizeInBytes = stats["size"]
     return fileSizeInBytes / 1000000.0;
  },

  sayHelloInSpanish: function() {
    return "Hola";
  }

};
