const Router = require('express');
const router = Router();

const {getTotal} = require('../../controllers/dashboard.controller');

router.get('/', getTotal);

module.exports = router;