'use strict'

const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const pharmacySchema = new Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    localizacion: { type: Object, required: true }
});

module.exports = mongoose.model("pharmacies", pharmacySchema);