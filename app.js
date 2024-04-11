require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const hompageRouter = require('./routes/homepage');
const catalogRouter = require('./routes/catalog');

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

app.use('/', hompageRouter);

app.use('/catalog', catalogRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});