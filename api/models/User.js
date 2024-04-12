const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { 
            type: String, 
            required: [true, 'Please enter an Email'], 
            unique: true,
            // Custom validator using isEmail function from validator package
            validate: {
                validator: isEmail,
                message: 'Please enter a valid email',
            },
        },
        password: { type: String, required: [true, 'Please enter a Password'] },
        isAdmin: { 
            type: Boolean, 
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", userSchema);
