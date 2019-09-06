'use strict'

const userModel = require('../database/models/user');

async function add_user(req, res) {
    try {
        var user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber
        }
        let exist = await userModel.findOne({ email: user.email });
        console.log(exist);
        
        if (exist) {
            return res.status(400).send({
                ok: false,
                response: 'Email already registered'
            });
        } else {
            const userToAdd = new userModel(user);
            await userToAdd.save((error, response) => {
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
    } catch (error) {
        return res.status(500).send({
            ok: false,
            error
        });
    }
}

module.exports = { add_user }