const Joi = require('joi');

exports.registerSchema = Joi.object({
    userName: Joi.string().trim().required(),
    email: Joi.string().trim().email({
        tlds: { allow: ['com', 'net'] }
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).trim().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password'))
        .trim()
        .required()
        .strip(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    address: Joi.string().trim()
})

exports.loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email({
            tlds: { allow: ['com', 'net'] }
        }),
    password: Joi.string().required()
});

exports.googleLoginSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    googleId: Joi.string().required(),
})