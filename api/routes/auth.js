const router = require('express').Router();
const authController = require('../controllers/authController');


//** */ /api/user/register
router.post('/signup', authController.signup)

module.exports = router;