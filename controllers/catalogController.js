const fetch = require('node-fetch');
const Car = require('../api/models/Car')



/*
*GET /catalog/cars
*/
exports.getCatalog = async (req, res) => {
    try {

        const { carType, pickUpLocationCity, dropOffLocationCity, ac, transmission }  = req.query

        req.session.dropOffDate = req.query.dropOffDate;
        req.session.pickUpDate = req.query.pickUpDate;


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
        
        if (ac) {
            searchParams.append('ac', ac === 'true'); // Convert string 'true' to boolean true
        }
        if (transmission) {
            searchParams.append('transmission', transmission);
        }else{
            searchParams.append('ac', 'true'); 
            searchParams.append('transmission', 'A');
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
    function formatDate(inputDate) {
        if (!inputDate) {
            return ''; // Return empty string or handle default case
        }

        // Split the input date string into year, month, and day components
        const [year, month, day] = inputDate.split('-');

        // Create a Date object using the parsed components
        const formattedDate = new Date(year, month - 1, day); // Note: month is zero-based in JavaScript

        // Get the month name and format the output string
        const monthName = formattedDate.toLocaleString('en-US', { month: 'long' }); // Get full month name
        const formattedOutput = `${monthName} ${parseInt(day, 10)}, ${year}`;

        return formattedOutput;
    }

    const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

    try {
        // Check if dropOffDate and pickUpDate are defined in the session
        const dropOffDate = formatDate(req.session.dropOffDate);
        const pickUpDate = formatDate(req.session.pickUpDate);

        const car = await Car.findOne({ _id: req.params.id });
        res.render('book', { layout: './layouts/book-main', car, dropOffDate, pickUpDate, stripePublicKey });
    } catch (err) {
        console.error('Error rendering book page:', err);
        res.status(404).json('Listing not found');
    }
};
    
