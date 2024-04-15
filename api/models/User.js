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

//Execute a function before saving the doc to db
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Static method to login user
userSchema.statics.login = async function (email, password){
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error ('incorrect password');
    }
    throw Error('incorrect email');
}

module.exports = mongoose.model("User", userSchema);
