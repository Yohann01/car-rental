const router = require('express').Router();
const authController = require('../controllers/authController');


//** */ /api/auth/signup
router.post('/signup', authController.signup);
//** */ /api/auth/logout
router.get('/logout', authController.logout);
//** */ /api/auth/login
router.post('/login', authController.login);

module.exports = router;