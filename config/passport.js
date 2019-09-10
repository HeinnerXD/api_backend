'use strict'
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.serializeUser((usuario, done) => {
    done(null, usuario._id);

})
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
        done(err, usuario);

    })
})

passport.use(new localStrategy(
    { usernamefield: 'email' },
    (email, password, done) => {
        Usuario.findOne({email}, (err, usuario) => {
            if (!usuario) {
                return done(null, false, { message: `Este email : ${email} no esta registrado` });
            } else {
               usuario.compararPassword(password, (err, sonIguales) =>{
                   if (sonIguales){
                       return done(null, usuario);

                   }else{
                       return done(null, false,{message:'La contraseña no es validad'});
                   }
               })
            }
        })
    }
))

exports.estaAutenticado = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    } 
    res.status(401).send('Tiene que hace login para acceder ha este recurso');
}