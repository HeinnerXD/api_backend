'use strict'

const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const staffSchema = new Schema({
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    telefono: {type: Number, required: true},
    farmacia: { type: Number, required: true },
    cargo: { type: String, require: true }
});

module.exports = mongoose.model("staff", staffSchema);