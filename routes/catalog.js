const router = require('express').Router();
const catalogController = require('../controllers/catalogController')

router.get('/cars', catalogController.getCatalog);

module.exports = router;
