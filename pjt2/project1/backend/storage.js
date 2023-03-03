const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'images/'); //save image file directory
    },
    filename: function(req,file,cb) {
        cb(null,moment().format('YYYYMMDDHHmmss')+'_'+file.originalname); //save image name
    }
});

module.exports = storage;