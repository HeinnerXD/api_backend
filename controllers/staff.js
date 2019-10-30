'use strict'

const staffModel = require('../database/models/staff');

async function addStaff(req, res) {
    try {
        let exist = await staffModel.findOne({ id: req.body.id });
        if (exist) {
            return res.status(400).send({
                ok: false,
                error: 'Person with id ' + req.body.id + ' already registered'
            });
        } else {
            let staffToSave = new staffModel(req.body);
            await staffToSave.save();
            return res.status(200).send({
                ok: true,
                response: req.body
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            error: error
        });
    }
}

module.exports = { addStaff }