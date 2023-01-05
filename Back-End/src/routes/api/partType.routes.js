const Router = require('express');
const router = Router();
const { PartType } = require('../../database/models/index');
const {getAll, getOne, create, deleteOne, update} = require('../../controllers/generic.controller');


// Genericas
router.post('/', create(PartType)); // Crea un una marca de repuesto
router.get('/', getAll(PartType)); // Obtiene todas las marcas de repuestos
module.exports = router;