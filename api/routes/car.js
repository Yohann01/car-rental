const router = require('express').Router();
const carController = require('../controllers/carController')


//** */ /api/catalog/cars
router.get('/cars', carController.getCars);
//* */ /api/catalog/postcar
router.post('/postcar', carController.postCars);

module.exports = router;