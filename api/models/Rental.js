const mongoose = require('mongoose')

const rentalSchema = new mongoose.Schema(
    {
        user_id: { type: String, required:true },
        car_id: { type: String, required:true },
        pickUpLocation: { type:String, required:true},
        dropOffLocation: { type:String, required:true},
        distance: {type:Number, required:true},
    },
    { timestamps:true }
);

module.exports = mongoose.model("Rental", rentalSchema);