const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename : (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const uniqueFileName = Date.now() + '.' + extension;
    callback(null, uniqueFileName);
  }
});

module.exports = multer({ storage: storage }).single('imageurl');