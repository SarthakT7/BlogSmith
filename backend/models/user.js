const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
})


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: '7d'})
    return token;
};

const User = mongoose.model('user', userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label('firstName'),
        lastName: Joi.string().required().label('lastName'),
        email: Joi.string().email().required().label('email'),
        password: passwordComplexity().required().label('password')
    });

    return schema.validate(data);
};

module.exports = {User, validate};