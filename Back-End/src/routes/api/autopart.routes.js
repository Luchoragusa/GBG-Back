const Router = require('express');
const router = Router();
const { AutoPart } = require('../../database/models/index');
const { upload, uploadFile, create } = require('../../controllers/upload');
const {getAll, getOne, deleteOne, update} = require('../../controllers/generic.controller');

// La validacion del token la hago aca pq no puedo registrar el 1 usuario sin antes tener los roles cargados

// Genericas
router.post('/file',  upload, uploadFile);
router.post('/',  create(AutoPart));
// router.post('/', create(AutoPart)); // Crea un autoparte, le paso el Modelo del objeto, pq el metodo createAutoPart lo que hace es crear un objeto de ese modelo
module.exports = router;