const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const usuarioSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true }

}, {
    timestamps: true
})

usuarioSchema.pre('save', function (next) {
    const usuario = this;
    if (!usuario.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            next(err);
        }
        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
            if (err) {
                next(err);
            }
            usuario.password = hash;
            next();
        })
    })
})

usuarioSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, sonIguales) => {
        if (err) {
            return cb(err);

        }
        cb(null, sonIguales);
    })
}
module.exports = mongoose.model('users', usuarioSchema);