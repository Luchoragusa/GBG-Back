const {AutoPart, PartType, PartBrand, CarBrand} = require('../database/models/index');
const multer=require('multer');
const { saveLog } = require("../utilities/util");

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
    try{
        // Le seteo la ruta de la  imagen al objeto que voy a crear
        req.body.image = req.file.originalname;

        // Seteo null a los campos que no se reciben, lo hago asi porque el form.data pasa el null como un string

        if (req.body.partModel == "null") {
            req.body.partModel = "-"
        }

        if (req.body.serialNumber == "null") {
            req.body.serialNumber = "-"
        }

        if (req.body.description == "null" || req.body.description == "-") {
            req.body.description = null
        }
        
        // Creo el objeto
        const elemnt = await AutoPart.create(req.body);
        if (elemnt) {
            const elementCreated = await getAfterCreate(elemnt);
            saveLog(AutoPart, 'create', req.userId, elemnt.id)
            return res.status(201).json(elementCreated);
        } else {
            return res.status(404).json({'msg':'No se recibieron los datos'})
        }
    } catch (error) {
        console.log("🚀 ~ file: autoPart.controller.js:62 ~ exports.createAutoPart= ~ error", error)
        res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
    }
}

exports.editAutoPart = async (req, res, next) => {
    try{
        const id = req.params.id;
        const element = await AutoPart.findByPk(id);
        if (element) {
            req.body.image = element.image;
            req.body.idPartBrand = req.body.partBrand
            req.body.idPartType = req.body.partType
            req.body.idCarBrand = req.body.carBrand

            console.log("🚀 ~ file: autoPart.controller.js:62 ~ exports.createAutoPart= ~ req.body", req.body)
            // Seteo null a los campos que no se reciben, lo hago asi porque el form.data pasa el null como un string
            if (req.body.partModel == "null") {
                req.body.partModel = "-"
            }
    
            if (req.body.serialNumber == "null") {
                req.body.serialNumber = "-"
            }
    
            if (req.body.description == "null" || req.body.description == "-") {
                req.body.description = null
            }

            if (req.body.partType == "null" || req.body.description == "-") {
                req.body.description = null
            }

            const elementUpdated = await AutoPart.update(req.body, { where: { id } });
            if (elementUpdated) {
                const elementUpdated = await getAfterCreate(req.body);
                saveLog(AutoPart, 'update', req.userId, elemnt.id)
                return res.status(201).json(elementUpdated);
            }
        } else {
            return res.status(404).json({'msg':'No se recibieron los datos'})
        }
    } catch (error) {
        console.log("🚀 ~ file: autoPart.controller.js:62 ~ exports.createAutoPart= ~ error", error)
        res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
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
                } else {
                    partBrand = {
                        id: 0,
                        name: '-'
                    }
                }

                if (autoPart.idCarBrand) {
                    carBrand = await getOne(CarBrand, autoPart.idCarBrand);
                } else {
                    carBrand = {
                        id: 0,
                        name: '-'
                    }
                }
                return await assignation(autoPart, partBrand, carBrand);
            })
        );
        await res.status(200).json(autoPartsArray);
    } catch (error) {
        console.log("🚀 ~ file: autoPart.controller.js:111 ~ exports.getAll= ~ error", error)
        res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
    }
}

exports.getAmount = async (req, res, next) => {
    const amount = Number(req.params.amount);
    try{
        const autoParts = await AutoPart.findAll({
            order: [['updatedAt', 'DESC']], // Ordena por la columna 'updatedAt' en orden descendente
            limit: amount, // Limita el resultado a 5 filas
            include: [{model: PartType}] // Incluye el modelo 'PartType' en la consulta
          })
        // Recoorro el array de autoParts y le agrego los objetos de las marcas

        const autoPartsArray = await Promise.all(
            autoParts.map(async (autoPart) => {
                autoPart.image = `${process.env.URL}/${autoPart.image}`

                var partBrand = null;
                var carBrand = null;

                if (autoPart.idPartBrand) {
                    partBrand = await getOne(PartBrand, autoPart.idPartBrand);
                } else {
                    partBrand = {
                        id: 0,
                        name: '-'
                    }
                }

                if (autoPart.idCarBrand) {
                    carBrand = await getOne(CarBrand, autoPart.idCarBrand);
                } else {
                    carBrand = {
                        id: 0,
                        name: '-'
                    }
                }
                return await assignation(autoPart, partBrand, carBrand);
            })
        );
        await res.status(200).json(autoPartsArray);
    } catch (error) {
        console.log("🚀 ~ file: autoPart.controller.js:159 ~ exports.getAmount= ~ error", error)
        res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
    }
}

exports.addStock = async (req, res, next) => {
    try{
        const { id } = req.params;
        const autoPart = await AutoPart.findByPk(id);

        if (autoPart) {
            const newStock = autoPart.stock + 1;
            saveLog(AutoPart, 'AddStock', req.userId, elemnt.id)
            const newAutoPart = await autoPart.update({ stock: newStock });
            return res.status(200).json(newAutoPart);
        } else {
            return res.status(404).json({'msg':'No se recibieron los datos'})
        }
    } catch (error) {
        console.log("🚀 ~ file: autoPart.controller.js:129 ~ exports.addStock= ~ error", error)
        res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
    }
}

exports.substractStock = async (req, res, next) => {
    try{
        const { id } = req.params;
        const autoPart = await AutoPart.findByPk(id);
        if (autoPart) {
            if (autoPart.stock === 0) {
                return res.status(404).json({'msg':'No hay stock del repuesto <strong> ' + autoPart.partModel + ' </strong>'})
            }
            const newStock = autoPart.stock - 1;
            saveLog(AutoPart, 'SubstractStock', req.userId, elemnt.id)
            const newAutoPart = await autoPart.update({ stock: newStock });
            return res.status(200).json(newAutoPart);
        } else {
            return res.status(404).json({'msg':'No se recibieron los datos'})
        }
    } catch (error) {
        console.log("🚀 ~ file: autoPart.controller.js:149 ~ exports.substractStock= ~ error", error)
        res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
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
        createdAt:      autoPart.createdAt,
        updatedAt:      autoPart.updatedAt
    }
}

getAfterCreate = async (autoPart) => {
    autoPart.image = `${process.env.URL}/${autoPart.image}`

    var partBrand = null;
    var carBrand = null;

    if (autoPart.idPartBrand) {
        partBrand = await getOne(PartBrand, autoPart.idPartBrand);
    } else {
        partBrand = {
            id: 0,
            name: '-'
        }
    }

    if (autoPart.idCarBrand) {
        carBrand = await getOne(CarBrand, autoPart.idCarBrand);
    } else {
        carBrand = {
            id: 0,
            name: '-'
        }
    }
    return await assignation(autoPart, partBrand, carBrand);
}