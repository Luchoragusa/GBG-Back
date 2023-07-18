const Router = require('express');
const router = Router();
const { getLogs } = require('../../controllers/logs.controller');

router.get('/', getLogs);

module.exports = router;