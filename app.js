'use strict'

const express = require('express');
const session = require('express-session');
const app = express();
const morgan = require('morgan');
const products_routes = require('./routes/products_routes');
const keys = require('./keys');

const passport = require('passport');
const users_routes = require('./routes/user_routes');
const bodyParser = require('body-parser'); 




const MongoStore = require('connect-mongo')(session); 




app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());





app.use(session({
    secret: 'Esto es segreto',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: keys.mongo_connection,
        autoReconnect: true
    })

}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/product', products_routes);
app.use('/user', users_routes);

module.exports = app;