const jwt = require('jsonwebtoken');
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //Check if the token exist & is verified
    
    if(!token){
        req.session.returnTo = req.originalUrl;
        res.redirect('/login')
    }
    else{
        jwt.verify(token, process.env.JWT, (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }
    
    
    
    // if (token){
    //     jwt.verify(token, process.env.JWT, (err, decodedToken) =>{
    //         if(err){
    //             console.log(err.message);
    //             res.redirect('/login');
    //         }else{
    //             console.log(decodedToken);
    //             next();
    //         }
    //     })
    // }else{
    //     res.redirect('/login')
    // }
};
//Check the current user
const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;

    if (token){
        if (token){
            jwt.verify(token, process.env.JWT, async (err, decodedToken) =>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next();
            }
            })
        }
    }else{
        res.locals.user = null;
        next();
    }
}
module.exports = { requireAuth, checkUser };