const mongoose = require('mongoose')

const carSchema = new mongoose.Schema(
    {
        name: { type: String, required:true },
        carType: { type: String, required:true },
        capacity: { type: Number, required:true },
        bag: { type: Number, required:true },
        doors: { type: Number, required:true },
        transmission: { type: String, required:true },
        ac: { type: Boolean, required:true },
        img: { type: String, required:true},
        pickUpLocationCity: { type:String, required:true},
        pickUpLocation: { type:String},
        dropOffLocationCity: { type:String, required:true},
        dropOffLocation: { type:String},
        totalCarRentalPrice: { type: Number},
    },
    { timestamps:true }
);

module.exports = mongoose.model("Car", carSchema);