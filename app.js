require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const port = 5000 || process.env.PORT;

app.use(express.urlencoded( { extended: true} ));
app.use(express.json());

//Static files
app.use(express.static('public'));

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { currentPage: 'index'})
});

app.get('/cars', (req, res) => {
    res.render('cars_catalog', {currentPage: 'cars_catalog'})
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});