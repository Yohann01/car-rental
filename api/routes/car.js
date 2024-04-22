const router = require('express').Router();
const carController = require('../controllers/carController')
const Car = require('../models/Car')

//** */ /api/catalog/cars
router.get('/cars', carController.getCars);
//* */ /api/catalog/postcar
router.post('/postcar', carController.postCars);

router.post('/postmany', carController.postMany);

module.exports = router;