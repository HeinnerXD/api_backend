'use strict'

const userModel = require('../../database/models/user');

function add_user(req, res) {
    var user = {
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phoneNumber = req.body.phoneNumber;
    const userToAdd = new userModel(user);
    userToAdd.save((error, response) => {
        if (error) {
            return res.status(500).send({
                ok: false,
                error
            });
        } else {
            if (response) {
                return res.status(200).send({
                    ok: true,
                    response
                });
            } else {
                return res.status(404).send({
                    ok: false,
                    error: 'Cant resolve post...'
                });
            }
        }
    });
}

module.exports = { add_user }