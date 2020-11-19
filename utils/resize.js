'use strict';
const sharp = require('sharp');

const makeThumbnail = async (file, thumbname) => { // file = full path to image (req.file.path), thumbname = filename (req.file.filename)

  const semiTransparentRedPng = await sharp({
    create: {
      width: 160,
      height: 160,
      channels: 4,
      background: { r: 255, g: 0, b: 0, alpha: 0.5 }
    }
  })
  .png()
  .toBuffer();
  console.log('makeThumbNail', file,thumbname)

};

module.exports = {
  makeThumbnail,
};