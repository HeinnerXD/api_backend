'use strict'
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({
        email: email
    });
    if (!user) {
        return done(null, false, { message: `Este email: ${email} no esta registrado` }), res.status(400).send({
            ok: false,
            response: `Este email: ${email} no esta registrado`
        });
    }
    if (!user.comparePassword(password)) {
        return done(null, false, { message: `Error de contraseña` }), res.status(400).send({
            ok: false,
            response: 'contraseña incorrecta'
        });
    }
    return done(null, user);
}));

exports.estaAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send({
        ok: false,
        response: 'Tiene que estar autenticado para acceder ha este recurso'
    });
}