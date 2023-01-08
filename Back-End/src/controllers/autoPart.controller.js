const {AutoPart, PartType, PartBrand, CarBrand} = require('../database/models/index');
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
        cb(null, './GBG-data/images')
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
    
    req.body.image = req.file.originalname;

    // Seteo null a los campos que no se reciben
    req.body.partModel = req.body.partModel || null;
    req.body.serialNumber = req.body.serialNumber || null;
    req.body.description = req.body.description || null;
    req.body.idCarBrand = req.body.idCarBrand || null;
    req.body.idPartBrand = req.body.idPartBrand || null;

    // Creo el objeto
    const elemnt = await AutoPart.create(req.body);
    if (elemnt) {
        return res.status(201).json({elemnt})
    } else {
        return res.status(404).json({'msg':'No se recibieron los datos'})
    }
}

exports.getAll = async (req, res, next) => {
    try{
        const autoParts = await AutoPart.findAll( {include: [{model: PartType}] });

        // Recoorro el array de autoParts y le agrego los objetos de las marcas

        const autoPartsArray = await Promise.all(
            autoParts.map(async (autoPart) => {
                autoPart.image = `${process.env.URL}/${autoPart.image}`

                var partBrand = null;
                var carBrand = null;
                
                if (autoPart.idPartBrand) {
                    partBrand = await getOne(PartBrand, autoPart.idPartBrand);
                }

                if (autoPart.idCarBrand) {
                    carBrand = await getOne(CarBrand, autoPart.idCarBrand);
                }

                return await assignation(autoPart, partBrand, carBrand);
            })
        );
        await res.status(200).json(autoPartsArray);
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.addStock = async (req, res, next) => {
    try{
        const { id } = req.params;
        const autoPart = await AutoPart.findByPk(id);
        if (autoPart) {
            const newStock = elemnt.stock + 1;
            const newAutoPart = await elemnt.update({ stock: newStock });
            return res.status(200).json({newAutoPart});
        } else {
            return res.status(404).json({'msg':'No se recibieron los datos'})
        }
    } catch (error) {
        res.status(500).json({ 'msg': 'Error en el servidor' });
    }
}


getOne = async (model, id) => {
    const elemnt = await model.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt'] }} );
    return elemnt;
}
    
assignation = async (autoPart, partBrand, carBrand) => {
    return {
        id:             autoPart.id,
        partModel:      autoPart.partModel,
        serialNumber:   autoPart.serialNumber,
        description:    autoPart.description,
        image:          autoPart.image,
        stock:          autoPart.stock,
        drawer:         autoPart.drawer,
        partType:       autoPart.PartType,
        partBrand:      partBrand,
        carBrand:       carBrand,
    }
}