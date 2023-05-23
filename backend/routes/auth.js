const router = require('express').Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' })
        }


        const validatePassword = await bcrypt.compare(
            req.body.password,
            user.password,
        );

        if (!validatePassword) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token =  user.generateAuthToken();
        res.status(200).send({ data: token, message: 'Successfully logged' });
    }

    catch (err) {
        return res.status(500).send({ message: 'Internal error' });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('email'),
        password: Joi.string().required().label('password')
    });

    return schema.validate(data);
}

module.exports = router;