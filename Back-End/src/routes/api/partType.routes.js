const Router = require('express');
const router = Router();
const { PartType } = require('../../database/models/index');
const {getAll, getOne, create, deleteOne, update} = require('../../controllers/generic.controller');


// Genericas
router.post('/', create(PartType)); // Crea un una marca de repuesto
module.exports = router;