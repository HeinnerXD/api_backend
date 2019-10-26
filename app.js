'use strict'

const express = require('express');
const session = require('express-session');
const app = express();
const morgan = require('morgan');
const products_routes = require('./routes/products_routes');
const keys = require('./keys');


const users_routes = require('./routes/user_routes');
const bodyParser = require('body-parser');
const passport = require('passport');
//const passportConfig = require('./config/passport');

const MongoStore = require('connect-mongo')(session);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());






app.use( session({
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
app.use(bodyParser.urlencoded({ extended: true }));

/*app.get('/', (req, res) => {
    req.session.cuenta = req.session.cuenta ? req.session.cuenta + 1 : 1;


    return res.status(200).send({
        ok: true,
        response: `API TALLER hola! has visto esta pagina:${req.session.cuenta}`
    });
});
*/

app.use('/product', products_routes);
app.use('/user', users_routes);

module.exports = app;