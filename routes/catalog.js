const router = require('express').Router();
const catalogController = require('../controllers/catalogController')
<<<<<<< HEAD

router.get('/cars', catalogController.getCatalog);

=======
const { requireAuth } = require('../api/middleware/authMiddleware')

router.get('/cars', catalogController.getCatalog);

router.get('/book', requireAuth, catalogController.getBookPage);

>>>>>>> temp-updates
module.exports = router;
