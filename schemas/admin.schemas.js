const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must have at least {#limit} characters',
        'string.max': 'Username cannot exceed {#limit} characters',
        'string.alphanum': 'Username can only contain alphanumeric characters',
        'any.required': 'Username is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email address is required'
    }),
    fullName: Joi.string().required().messages({
        'any.required': 'Full name is required'
    }),
    phoneNumber: Joi.string().required().messages({
        'any.required': 'Phone number is required'
    }),
    password: Joi.string().min(8).max(30).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must have at least {#limit} characters',
        'string.max': 'Password cannot exceed {#limit} characters',
        'string.pattern.base': 'Password must contain only alphanumeric characters',
        'any.required': 'Username is required'
    }),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match'
    })
}).with('password', 'confirmPassword');

const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must have at least {#limit} characters',
        'string.max': 'Username cannot exceed {#limit} characters',
        'string.alphanum': 'Username can only contain alphanumeric characters',
        'any.required': 'Username is required'
    }),
    password: Joi.string().min(8).max(30).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must have at least {#limit} characters',
        'string.max': 'Password cannot exceed {#limit} characters',
        'string.pattern.base': 'Password must contain only alphanumeric characters',
        'any.required': 'Username is required'
    }),
})

module.exports = {
    registerSchema,
    loginSchema
}
