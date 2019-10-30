'use strict'
const passport = require('passport');
const Usuario = require('../database/models/user');

exports.postSigup = (req, res, next) => {
    const nuevoUsuario = new Usuario({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber
    });
    Usuario.findOne({
        email: req.body.email
    }, (err, usuarioExistente) => {

        if (usuarioExistente) {
            return res.status(400).send({
                ok: false,
                response: req.body.email + ':_ya ese email esta registrado'
            });
        }
        nuevoUsuario.save((err) => {
            if (err) {
                next(err);
            }
            req.logIn(nuevoUsuario, (err) => {
                if (err) {
                    next(err);
                }
                return res.status(200).send({
                    ok: true,
                    response: 'Usuario creado exitosamente',
                    nuevoUsuario
                });
            })
        })
    })
}

exports.postLogin = async (req, res, next) => {
    passport.authenticate('local-signin', (err, usuario, info) => {
        if (err) {
            next(err);
        }
        if (!usuario) {
            return res.status(400).send({
                ok: false,
                response: 'Email o contraseña invalidas'
            });
        }
        req.logIn(usuario, (err) => {
            if (err) {
                next(err);
            }
            res.status(200).send({
                ok: true,
                response: 'login exitoso',
                user: usuario
            });
        })
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout();
    res.status(200).send({
        ok: true,
        response: 'Logout exitoso'
    });
}