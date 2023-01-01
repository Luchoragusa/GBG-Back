const {AutoPart} = require('../database/models/index');
const multer=require('multer');

// Filtro de archivos

const fileFilter=function(req,file,cb){

    const allowedTypes=["image/jpg","image/jpeg","image/png"];

    if(!allowedTypes.includes(file.mimetype)){

        const error=new Error("wrong file type");
        error.code="LIMIT_FILE_TYPES";
        return cb(error,false);
      }
  
      cb(null,true);
}

// Es donbde se guardan los archivos y el nmobre que van a tener

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
    
// Es la cte donde seteamos la configuracion de multer

// const upload = multer({ storage: storage })
const upload=multer({storage,fileFilter});

// Es la funcion que se va a ejecutar cuando se haga la peticion

exports.upload = upload.single('image')

exports.createAutoPart = async (req, res, next) => {

    // Le seteo la ruta de la  imagen al objeto que voy a crear
    req.body.image = req.file.path;

    // Seteo null a los campos que no se reciben
    req.body.partModel = req.body.partModel || null;
    req.body.serialNumber = req.body.serialNumber || null;
    req.body.description = req.body.description || null;

    // Creo el objeto
    const elemnt = await AutoPart.create(req.body);
    if (elemnt) {
        return res.status(201).json({elemnt})
    } else {
        return res.status(404).json({'msg':'No se recibieron los datos'})
    }
}
