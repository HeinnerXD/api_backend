'use strict'

const express = require('express');
const app = express();
const morgan = require('morgan');
const index_routing = require('./routes/index_routing');
const bodyParser = require('body-parser');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.status(200).send({
        ok: true,
        response: 'API TALLER'
    });
});

app.use('/product', index_routing.products_routes);
app.use('/user', index_routing.users_routes);

module.exports = app;