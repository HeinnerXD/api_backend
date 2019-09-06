'use strict'

const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const productSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number }
});

module.exports = mongoose.model("users", productSchema);