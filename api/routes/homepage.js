const router = require('express').Router()
const homepageController = require('../controllers/homepageController');
router.get('/', homepageController.homepage);
module.exports = router;