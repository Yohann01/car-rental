
const Car = require('../models/Car');
const calculateDistance = require('../utils/distanceCalculator');
const setBasePrice = require('../utils/carTypePriceHelper')
const { setLocation } = require('../utils/locationHelper');

/*
*GET /api/catalog/cars
*/
exports.getCars =  async (req, res) => {
    const { carType, pickUpLocationCity, dropOffLocationCity}  = req.query
    
    let query = {}

    if ( carType || pickUpLocationCity || dropOffLocationCity){
        const carTypes = Array.isArray(carType) ? carType : [carType];

        query = {
            carType: { $in: carTypes }, 
            pickUpLocationCity,
            dropOffLocationCity
        }
        // console.log("API query", query);
    }
    try {
        const cars = await Car.find(query)

        res.send(cars);
        
        

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

/*
*POST /api/catalog/postcar
*/

exports.postCars = async (req, res) => {
    const {
        name, carType, capacity, bag,
        doors, transmission, ac, img,
        pickUpLocationCity, dropOffLocationCity,
        
    } = req.body;

    // Calculate distance based on pickUpLocationCity and dropOffLocationCity
    const distance = calculateDistance(pickUpLocationCity, dropOffLocationCity);
    const basePricePerKm = setBasePrice(carType);

    const totalCarRentalPrice = distance * basePricePerKm
    console.log(totalCarRentalPrice);

    const dropOffLocation = setLocation(dropOffLocationCity);
    const pickUpLocation = setLocation(pickUpLocationCity);

    const newCar = new Car({
        name, carType, capacity, bag,
        doors, transmission, ac, img,
        pickUpLocationCity, pickUpLocation,
        dropOffLocationCity, dropOffLocation,
        totalCarRentalPrice
    });

    try {
        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
    } catch (err) {
        console.error('Error saving car:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};