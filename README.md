# Image-Cropping


Used to crop images for different platforms such as Steam, Apple Developer etc.

###### resize the image
Usage:
```javascript
node index.js resize srcPath dstPath newImgWidth newImgHeight
```

###### crop the image
Note: This always will crop from the center out
Usage:
```javascript
node index.js crop srcPath dstPath newImgWidth newImgHeight
```


TODO: 
create steam trading cards via cropping and resizing
Images required:

Large card images, 1920x1080px acts as "zoomed in" version, JPG format smaller than 350kb
Small card images, 206x184px placed in the frames, acts as a view into the large image, PNG format
Game logo, small shadow can be included, 206x44 transparent PNG, must be legible on both dark and light backgrounds
