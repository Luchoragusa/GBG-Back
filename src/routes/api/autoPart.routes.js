const Router = require('express');
const router = Router();
const { AutoPart } = require('../../database/models/index');
const { upload, createAutoPart, getAll, addStock, substractStock, getAmount, editAutoPart } = require('../../controllers/autoPart.controller');
const { update } = require('../../controllers/generic.controller');


// La validacion del token la hago aca pq no puedo registrar el 1 usuario sin antes tener los roles cargados

// Especificas
router.post('/file',  upload, createAutoPart);
router.put('/:id', editAutoPart);
router.get('/', getAll);
router.get('/:amount', getAmount);
router.put('/add/:id', addStock);
router.put('/substract/:id', substractStock);

module.exports = router;