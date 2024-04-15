const User = require('../models/User');
const jwt = require('jsonwebtoken');


const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { username: '', email: '', password: '' };

    //Login incorrect email
    if(err.message === 'incorrect email'){
        errors.email = "Email is not registered";
    }

    //Login incorrect password
    if(err.message === 'incorrect password'){
        errors.password = "Incorrect password";
    }

    // Duplicate error code (check if err.keyValue is defined)
    if (err.code === 11000) {
        if (err.keyValue.hasOwnProperty('email')) {
            errors.email = 'Email is already registered';
        }
        if (err.keyValue.hasOwnProperty('username')) {
            errors.username = 'Username is already taken';
        }
        return errors;
    }

    // Validation errors
    if (err.message && err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT, {
        expiresIn:maxAge
    });
}
/*
*POST /api/auth/signup
*/
exports.signup = async (req, res) => {
    const newUser = new User ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    try{
        const user = await newUser.save();
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly:true , maxAge: maxAge * 1000 });
        res.status(201).json({user: user._id});
        
    }catch(err){
        const errors = handleErrors(err);
        res.status(401).json({ errors, err })
        console.log(err);
    }
};


/*
*POST /api/auth/login
*/
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
       const user = await User.login(email, password);
       const token = createToken(user._id)
       res.cookie('jwt', token, { httpOnly:true , maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}   

/*
*POST /api/auth/logout
*/
exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');

    console.log('Logout');
}
