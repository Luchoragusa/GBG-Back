const Router = require('express');
const router = Router();
const { CarBrand } = require('../../database/models/index');
const {getAll, getOne, create, deleteOne, update} = require('../../controllers/generic.controller');

// Genericas
router.post('/', create(CarBrand)); 
router.get('/', getAll(CarBrand));
module.exports = router;