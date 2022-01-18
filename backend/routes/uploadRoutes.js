import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(re, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

function checkFileType(file, cb) {
    const fileType = /jpg|jpeg|png/;
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileType.test(file.mimetype);
    if (extname && mimeType) {
        cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
})

export default router;