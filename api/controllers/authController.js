const User = require('../models/User')

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { username: '', email: '', password: ''};
    
    //Duplicate error code
    if (err.keyValue.hasOwnProperty('email') || err.code === 11000){
        errors.email = 'Email is already registered'
        return errors
    }
    if (err.keyValue.hasOwnProperty('username') || err.code === 11000){
        errors.username = 'Username is already taken'
        return errors
    }
    //validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;
        });
    }
    return errors
}
/*
*POST /api/user/signup
*/
exports.signup = async (req, res) => {
    const newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        const errors = handleErrors(err);
        res.status(500).json({errors})
    }
};
