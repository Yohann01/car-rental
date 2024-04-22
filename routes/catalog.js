const router = require('express').Router();
const catalogController = require('../controllers/catalogController')
const { requireAuth } = require('../api/middleware/authMiddleware')

router.get('/cars', catalogController.getCatalog);

router.get('/book/:id', requireAuth, catalogController.getBookPage);

module.exports = router;
