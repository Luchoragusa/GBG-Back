// const {AutoPart} = require('../../database/models/index');
const multer=require('multer');

// Filtro de archivos

const fileFilter=function(req,file,cb){

    const allowedTypes=["image/jpg","image/jpeg","image/png"];

    if(!allowedTypes.includes(file.mimetype)){
      return cb("Tipo de archivo no permitido",false);
    }

    cb(null,true);
}

// Es donbde se guardan los archivos y el nmobre que van a tener

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
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

exports.uploadFile = (req, res) => {
    res.send({ data: 'Enviar un archivo' })
}
