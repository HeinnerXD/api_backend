'use strict'
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/models/user');


passport.serializeUser((user, done) => {
    done(null, user.id);

})
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, user) => {
        done(err, user);

    })
})




passport.use(new LocalStrategy({ usernamefield: 'email', passwordField: 'password' },(email, password, done) => {
        User.findOne({email, password }, (err, user) => {
            if (!user) {
                return done(null, false, {
                    message: `Este email : ${email} no esta registrado`
                });
            } else {
                
                User.comparePassword(password, (err, sonIguales) => {
                    if (sonIguales) {
                        return done(null, user);




                    } else {
                        return done(null, false, {
                            message: 'La contraseña no es validad'
                        });
                    }
                })
            }
        })
    }
))

exports.estaAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('Tiene que hace login para acceder ha este recurso');
}