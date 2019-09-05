'use strict'

const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const productSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, require: true }
});

module.exports = mongoose.model("products", productSchema);