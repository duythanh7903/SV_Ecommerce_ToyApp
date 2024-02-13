import multer from 'multer'
import appRootPath from 'app-root-path'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${appRootPath}/src/public/images/upload`)
    },

    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only image files are allowed!'
        return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
}

const UploadImage = multer({
    storage: storage,
    fileFilter: imageFilter
})

const UploadMultipleImages = multer({
    storage: storage,
    fileFilter: imageFilter
}).array('image', 7)

export {
    UploadImage,
    UploadMultipleImages
}