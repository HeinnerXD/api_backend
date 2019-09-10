'use strict'

const express = require('express');
const session = require('express-session');
const app = express();
const morgan = require('morgan');
const index_routing = require('./routes/index_routing');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('./config/passport');

const MongoStore = require('connect-mongo')(session);
const moungo_url = 'mongodb://127.0.0.1:27017/auth';

mongoose.Promise = global.Promise;
mongoose.connect(moungo_url);
mongoose.connection.on('error', (err) => {
    throw err;
    process.exit(1);
})



app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(session({
    secret: 'Esto es segreto',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: moungo_url,
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
const controllersUsuario = require('./controllers/usuario');
app.post('/signup', controllersUsuario.postSigup);
app.post('/login', controllersUsuario.postLogin);
app.get('/logout', passportConfig.estaAutenticado, controllersUsuario.logout);

app.get('/usuarioInfo', passportConfig.estaAutenticado, (req, res) => {
    res.json(req.user);
})


module.exports = app;