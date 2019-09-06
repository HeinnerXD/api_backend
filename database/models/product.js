'use strict'

const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const productSchema = new Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    pharmacy_id: { type: String, required: true },
    quantity: { type: Number, require: true },
    description: { type: String }
});

module.exports = mongoose.model("products", productSchema);