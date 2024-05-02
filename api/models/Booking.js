const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
    {
        costumerName: { type: String, required:true },
        email: { type: String, required:true },
        carId: { type: String, required:true },
        paymentMethod: { type: String, required:true },
        pickUpLocationCity: { type:String, required:true },
        pickUpDate: { type:String },
        dropOffLocationCity: { type:String, required:true },
        dropOffDate: { type:String },
    },
    { timestamps:true }
);

module.exports = mongoose.model("Booking", bookingSchema);