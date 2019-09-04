'use strict'

function add_user(req, res) {
    var userToAdd = {
        name: '',
        email: '',
        password: '',
        phoneNumber: ''
    }
    
    userToAdd.name = req.body.name;
    userToAdd.email = req.body.email;
    userToAdd.password = req.body.password;
    userToAdd.phoneNumber = req.body.phoneNumber;

    return res.status(200).send({
        ok: true,
        response: userToAdd
    });

}

module.exports = { add_user }