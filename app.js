'use strict'

const express = require('express');
const app = express();
const morgan = require('morgan');
const products_routes = require('./routes/products_routes');
const users_routes = require('./routes/user_routes');
const staff_routes = require('./routes/staff_routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send({
        ok: true,
        response: 'API REST TALLER'
    });
});

app.use('/product', products_routes);
app.use('/user', users_routes);
app.use('/staff', staff_routes);


module.exports = app;