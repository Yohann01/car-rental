const router = require('express').Router();
router.get('/home', (req, res) =>{
    res.send('catalog API test');
});

module.exports = router;
