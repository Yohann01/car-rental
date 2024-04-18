
const Car = require('../models/Car');



/*
*GET /api/catalog/cars
*/
exports.getCars =  async (req, res) => {
    const { carType, pickUpLocationCity, dropOffLocationCity }  = req.query

    let query = {}

    if ( carType || pickUpLocationCity || dropOffLocationCity){
    const carTypes = Array.isArray(carType) ? carType : [carType];

    query = {
        carType: { $in: carTypes }, 
        pickUpLocationCity,
        dropOffLocationCity
    }
    console.log("API query", query);
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
            pickUpLocationCity: req.body.pickUpLocationCity,
            pickUpLocation: req.body.pickUpLocation,
            dropOffLocationCity: req.body.dropOffLocationCity,
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
    