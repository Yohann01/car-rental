const router = require('express').Router();
const axios = require('axios').default;

router.get('/cars', async (req, res) => {
    try {
        const API = await axios.get('https://car-rental-website-api-ydv9.onrender.com/api/catalog/cars');
        const dataCount = API.data.length; // Corrected here
        res.render('carsCatalog', { layout: './layouts/catalog-main', cars: API.data, dataCount });
        // console.log(dataCount);
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log('Error', err.message);
        }
    }
});

module.exports = router;
