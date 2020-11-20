'use strict';
const {ExifImage} = require('exif');

const getCoordinates = (imgFile) => { // imgFile = full path to uploaded image
  return new Promise((resolve, reject) => {
    try {

      new ExifImage({image: imgFile}, function(error, exifData) {
        if (error) {
          console.log('Error: ' + error.message)
          reject(error);
        } else {
          console.log('Exif data', exifData);

          const coordinates = [
            gpsToDecimal(exifData.gps.GPSLongitude,
                exifData.gps.GPSLongitudeRef),
            gpsToDecimal(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef),
          ];
          resolve(coordinates);
        }
      });
    }
    catch (error) {
      reject(error);
    }
  });
};

// convert GPS coordinates to decimal format
// for longitude, send exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef
// for latitude, send exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef
const gpsToDecimal = (gpsData, hem) => {
  let d = parseFloat(gpsData[0]) + parseFloat(gpsData[1] / 60) +
      parseFloat(gpsData[2] / 3600);
  return (hem === 'S' || hem === 'W') ? d *= -1 : d;
};

module.exports = {
  getCoordinates,
};
