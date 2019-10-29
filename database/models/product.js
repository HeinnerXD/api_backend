'use strict'

const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const productSchema = new Schema({
    id: { type: Number, required: true },
    imagen: {type: String, required: true},
    nombre: { type: String, required: true },
    farmacia: { type: Number, required: true },
    cantidad: { type: Number, require: true },
    descripcion: { type: String },
    precio: { type: Number, required: true }
});

module.exports = mongoose.model("products", productSchema);