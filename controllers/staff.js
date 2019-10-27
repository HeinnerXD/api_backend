'use strict'

const staffModel = require('../database/models/staff');

async function addStaff(req, res) {
    try {
        let staffToSave = new staffModel(req.body);
        await staffToSave.save();
        return res.status(200).send({
            ok: true,
            response: req.body
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            error: 'Internal server error'
        });
    }
}

module.exports = { addStaff }