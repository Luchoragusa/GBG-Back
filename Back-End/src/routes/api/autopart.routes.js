const Router = require('express');
const router = Router();
const { AutoPart } = require('../../database/models/index');
const { upload, uploadFile, helloWorld } = require('../../controllers/upload');

// La validacion del token la hago aca pq no puedo registrar el 1 usuario sin antes tener los roles cargados

// Genericas
router.get('/file',  helloWorld);
router.post('/file',  upload, uploadFile);
module.exports = router;