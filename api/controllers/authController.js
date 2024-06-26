const { default: Stripe } = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Car = require('../models/Car');
const Booking = require('../models/Booking')

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
        
        const returnTo = req.session.returnTo || '/';
        delete req.session.returnTo; // Clear the stored URL
        res.status(200).json({ user: user._id, returnTo })
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

/*
*POST /api/auth/payment
*/

exports.payment = async (req, res) => {
    console.log(req.body);
    try {
        const paymentMethodId = req.body.paymentMethodId;
        const carId = req.body.carId;
        const cars = await Car.findOne({ _id: carId });
        console.log(cars.totalCarRentalPrice);
        const price = cars.totalCarRentalPrice * 100;
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency: 'php',
            payment_method: paymentMethodId,
            confirm: true,
            return_url: 'http://localhost:5000/', // Replace with your actual success URL
        });
        const paymentIntentId = paymentIntent.id;
        createBooking(req.body).then(booking => {
            // Booking successfully created
            res.status(200).json({ success: true, paymentIntentId: paymentIntentId, booking: booking });
        }).catch(err => {
            // Error occurred while creating booking
            console.error('Error creating booking:', err.message);
            res.status(500).json({ success: false, error: err.message });
        });
    } catch (error) {
        // Handle any errors and return an error response to the client
        console.error('Error processing payment:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

function createBooking(data) {
    return new Promise((resolve, reject) => {
        const newBooking = new Booking({
            costumerName: data.name,
            email: data.email,
            carId: data.carId,
            paymentMethod: data.paymentMethod,
            pickUpLocationCity: data.pickUpLoc,
            pickUpDate: data.pickUpDate,
            dropOffLocationCity: data.dropOffLoc,
            dropOffDate: data.dropOffDate,
        });
        newBooking.save().then(booking => {
            // Booking successfully saved
            console.log('Booking created:', booking);
            resolve(booking);
        }).catch(err => {
            // Error occurred while saving booking
            console.error('Error saving booking:', err.message);
            reject(err);
        });
    });
}

