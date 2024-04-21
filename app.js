require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session')

//Frontend routes imports
const hompageRouter = require('./routes/homepage');
const catalogRouter = require('./routes/catalog');

//API routes imports
const carRoute = require('./api/routes/car');
const authRoute = require('./api/routes/auth');
const { checkUser } = require('./api/middleware/authMiddleware');


const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION, // Add a secret string for session encryption
    resave: false,
    saveUninitialized: false
}));
//MongoDB connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBConnection successfull"))
.catch((err) => {
    console.log(err)
});

//Static files
app.use(express.static('public'));

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');



//Frontend routes
app.use('*', checkUser);
app.use('/',  hompageRouter);
app.use('/catalog', catalogRouter);

//API routes
app.use('/api/catalog', carRoute);
app.use('/api/auth', authRoute);




app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});