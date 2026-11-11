const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload directory
const uploadPath = path.join(__dirname, "../uploads/reports");

// Create folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// Allow only PDF and Images
const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, PNG, JPG and JPEG files are allowed."));
    }

};

const upload = multer({

    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    }

});

module.exports = upload;