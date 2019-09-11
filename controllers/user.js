const passport = require('passport');
const Usuario = require('../models/user');

exports.postSigup = (req, res, next) => {
    const nuevoUsuario = new Usuario({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber
    });

    Usuario.findOne({ email: req.body.email }, (err, usuarioExistente) => {
        if (usuarioExistente) {
            return res.status(400).send('Ya ese email esta registrado');

        }

        nuevoUsuario.save((err) => {
            if (err) {
                next(err);
            }
            req.logIn(nuevoUsuario, (err) => {
                if (err) {
                    next(err);
                }
                res.send('Usuario creado exitosamente');
            })
        })
    })
}

exports.postLogin = (req, res, next) => {
    passport.authenticate('local', (err, usuario, info) => {
        if (err) {
            next(err);
        }
        if (!usuario) {
            return res.status(400).send('Email o contraseña no validos');
        }
        req.logIn(usuario, (err) => {
            if (err) {
                next(err);
            }
            res.send('Login Exitoso');
        })
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout();
    res.send('Logout exitoso');
}