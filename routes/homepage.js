const router = require('express').Router();
const homepageController = require('../controllers/homepageController');



router.get('/' , homepageController.getHomepage);
router.get('/login', homepageController.getSignIn);
router.get('/signup', homepageController.getSignUp);
router.get('/about', homepageController.getAbout);
router.get('/contact', homepageController.getContact);



module.exports = router;

// router.get('/' , async (req, res) => {
//     res.render('index');
// });
// module.exports = router;
