const Router = require('express');
const router = Router();

const apiUser = require('./api/user.routes');
router.use('/users', apiUser);

const apiAutoPart = require('./api/autoPart.routes');
router.use('/autoparts', apiAutoPart);

const apiPartBrand = require('./api/partBrand.routes');
router.use('/partbrands', apiPartBrand);

const apiPartType = require('./api/partType.routes');
router.use('/parttypes', apiPartType);

const apiCarBrand = require('./api/carBrand.routes');
router.use('/carbrands', apiCarBrand);

module.exports = router;