const fetch = require('node-fetch');
const Car = require('../api/models/Car')


/*
*GET /catalog/cars
*/
exports.getCatalog = async (req, res) => {
    try {

        const { carType, pickUpLocationCity, dropOffLocationCity }  = req.query

        req.session.dropOffDate = req.query.dropOffDate;
        req.session.pickUpDate = req.query.pickUpDate;
        console.log(req.session.dropOffDate)
        const searchParams = new URLSearchParams();

        if (carType) {
            if (Array.isArray(carType)) {
                // Handle case when carType is an array with multiple values
                carType.forEach(type => {
                    searchParams.append('carType', type); // Append each carType value separately
                });
            } else {
                // Handle case when carType is a single value
                searchParams.append('carType', carType);
            }
        }

        if (pickUpLocationCity) {
            searchParams.append('pickUpLocationCity', pickUpLocationCity);
        }

        if (dropOffLocationCity) {
            searchParams.append('dropOffLocationCity', dropOffLocationCity);
        }

        const queryString = searchParams.toString();
        // console.log(queryString);

        const port = process.env.PORT;
        const apiUrl = `http://localhost:${port}/api/catalog/cars`;
        
        let apiUrlWithQueryString = apiUrl

        if(req.query)
        {

            apiUrlWithQueryString = `${apiUrl}?${queryString}`

        }
        // console.log(apiUrlWithQueryString)
        // Make a GET request to the API endpoint
        const response = await fetch(apiUrlWithQueryString);
        
        // Check if the response is successful (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Check if the response data is an array
        if (!Array.isArray(data)) {
            throw new Error('API response is not an array');
        }

        const dataCount = data.length;
        
        // Render the 'carsCatalog' view with the retrieved data and dataCount
        
        res.render('carsCatalog', { layout: './layouts/catalog-main', cars: data, dataCount, query: req.query });
    } catch (err) {
        console.error('Error fetching catalog:', err);

        // Log specific error details based on the error type
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log('Error', err.message);
        }

        // Send an error response to the client
        res.status(500).send('Error fetching catalog');
    }
};
/*
*GET /catalog/book
*/

exports.getBookPage = async (req, res) => {

    const dropOffDate = req.session.dropOffDate
    const pickUpDate = req.session.pickUpDate
    console.log(dropOffDate)
    try{
        const car = await Car.findOne({ _id: req.params.id })
        res.render('book', { layout: './layouts/book-main', car, dropOffDate, pickUpDate})
    }catch(err){
        res.status(404).json('Listing not found');
    }
}
