'use strict'

const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const productSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    pharmacy_id: { type: Number, required: true },
    quantity: { type: Number, require: true },
    description: { type: String }
});

module.exports = mongoose.model("products", productSchema);