const Router = require('express');
const router = Router();

const apiAutoPart = require('./api/autopart.routes');
router.use('/autoparts', apiAutoPart);


module.exports = router;