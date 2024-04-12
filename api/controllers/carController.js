
const Car = require('../models/Car');



/*
*GET /api/catalog/cars
*/
exports.getCars =  async (req, res) => {
    try {
        const cars = await Car.find({});
        res.send(cars);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

/*
*POST /api/catalog/postcar
*/

exports.postCars = async (req,res) => {
        const newCar = new Car ({
            name: req.body.name,
            carType: req.body.carType,
            capacity: req.body.capacity,
            bag: req.body.bag,
            doors: req.body.doors,
            transmission: req.body.transmission,
            ac: req.body.ac,
            img: req.body.img,
            pickUpLocation: req.body.pickUpLocation,
            dropOffLocation: req.body.dropOffLocation,
            basePricePerMile: req.body.basePricePerMile,
        });
    
        try {
            const savedCar = await newCar.save();
            res.status(201).json(savedCar);
            
        }catch(err){
            res.status(500).json(err);
        }
    
    };
    