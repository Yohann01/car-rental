const fetch = require('node-fetch');


/*
*GET /catalog/cars
*/
exports.getCatalog = async (req, res) => {
    try {
        const port = process.env.PORT;
        const apiUrl = `http://localhost:${port}/api/catalog/cars`;

        // Make a GET request to the API endpoint
        const response = await fetch(apiUrl);

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
        res.render('carsCatalog', { layout: './layouts/catalog-main', cars: data, dataCount });
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
    res.render('book')
}