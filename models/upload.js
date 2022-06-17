// Used for uploading files for posts and user avatar
import multer from "multer";

const storage = multer.diskStorage({
    // file destination
    destination: function (req, file, callback) {
        callback(null, "./public/uploads/")
    },

    // adds back file extension as multer removes it by default
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"||
            file.mimetype == "image/gif") {
                callback(null, true);
            }
        else {
            console.log("Only JPG/JPEG or PNG allowed.");
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 3
    }
});

export default upload;