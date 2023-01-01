const Router = require('express');
const router = Router();
const { AutoPart } = require('../../database/models/index');
const { upload, createAutoPart } = require('../../controllers/upload');
const {getAll, getOne, deleteOne, update} = require('../../controllers/generic.controller');


// La validacion del token la hago aca pq no puedo registrar el 1 usuario sin antes tener los roles cargados

// Genericas
router.post('/file',  upload, createAutoPart);
module.exports = router;