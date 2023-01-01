// const {AutoPart} = require('../../database/models/index');
const multer=require('multer');

// Filtro de archivos

const fileFilter=function(req,file,res){

    const allowedTypes=["image/jpg","image/jpeg","image/png"];

    if(!allowedTypes.includes(file.mimetype)){
      return res.status(500).json({error: "Tipo de archivo no permitido"});
    }
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

exports.create = Model =>
    async (req, res, next) => {

        console.log(req.body);

        const elemnt = await Model.create(req.body);
        if (elemnt) {
            return res.status(201).json({elemnt})
        } else {
            return res.status(404).json({'msg':'No se recibieron los datos'})
        }
    }
