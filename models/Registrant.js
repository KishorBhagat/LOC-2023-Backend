const mongoose = require('mongoose');
const { isEmail } = require('validator');

const RegistrantSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    regdNo: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, 'Regd No. must be of 10 digits'],
        maxlength: [10, 'Regd No. must be of 10 digits']
    },
    year: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: true,
        minlength: [10, 'Phone no. must be of 10 digits'],
        maxlength: [10, 'Phone no. must be of 10 digits']
    }
}, { timestamps: true});

const Registrant = new mongoose.model('registrant', RegistrantSchema);

module.exports = Registrant;