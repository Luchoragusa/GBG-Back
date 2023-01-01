const Router = require('express');
const router = Router();
const { PartBrand } = require('../../database/models/index');
const {getAll, getOne, create, deleteOne, update} = require('../../controllers/generic.controller');


// Genericas
router.post('/', create(PartBrand)); // Crea un una marca de repuesto
module.exports = router;