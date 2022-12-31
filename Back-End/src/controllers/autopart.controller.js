// const {AutoPart} = require('../../database/models/index');
const multer=require('multer');

// Es donbde se guardan los archivos y el nmobre que van a tener

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
    
// Es la cte donde seteamos la configuracion de multer

const upload = multer({ storage: storage});

// Es la funcion que se va a ejecutar cuando se haga la peticion

exports.upload = upload.single('image');

exports.uploadFile = async (req,res) => {
    // try {
    //     const {file} = req.image;
    //     const {name, mimetype, size} = file;
    //     const newFile = await AutoPart.create({id, name, mimetype, size});
    //     res.status(200).json(newFile);
    // } catch (error) {
    //     res.status(500).json(error);
    // }
};
