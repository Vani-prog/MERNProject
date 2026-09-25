import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

function fileFilter(req, file, cb) {

    const allowedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
    if (!allowedFiles.includes(file.mimetype)) {
        cb(new Error('Only images are allowed.'), false)
    } else {
        cb(null, true)
    }

}

const upload = multer({ storage: storage, fileFilter: fileFilter })

export default upload