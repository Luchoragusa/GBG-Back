const Router = require('express');
const router = Router();
const { validateToken } = require('../utilities/middleware')

const apiUser = require('./api/user.routes');
router.use('/users', apiUser);

const apiAutoPart = require('./api/autoPart.routes');
router.use('/autoparts', validateToken, apiAutoPart);

const apiPartBrand = require('./api/partBrand.routes');
router.use('/partbrands', validateToken, apiPartBrand);

const apiPartType = require('./api/partType.routes');
router.use('/parttypes', validateToken, apiPartType);

const apiCarBrand = require('./api/carBrand.routes');
router.use('/carbrands', validateToken, apiCarBrand);

const apiDashboard = require('./api/dashboard.routes');
router.use('/dashboard', validateToken, apiDashboard);

const apiLogs = require('./api/logs.routes');
router.use('/logs', validateToken, apiLogs);

module.exports = router;