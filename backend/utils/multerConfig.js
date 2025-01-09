const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'uploads/pdf');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, '${uniqueSuffix}-${file.originalname}')
    },
});

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'application/pdf'){
        cb(null, true);
    }else{
        cb(new Error('Apenas arquivos PDF são permitidos.'), false);
    }
};

const upload = multer({storage, fileFilter});

module.exports = upload;