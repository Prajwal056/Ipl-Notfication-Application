const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Team name is required',
        'string.empty': 'Team name cannot be empty'
    }),
    captain: Joi.string().required().messages({
        'any.required': 'Captain name is required',
        'string.empty': 'Captain name cannot be empty'
    }),
    homeCity: Joi.string().min(6).required().messages({
        'string.min': 'Home city must be at least 6 characters long',
        'any.required': 'Home city is required',
        'string.empty': 'Home city cannot be empty'
    }),
    coach: Joi.string().min(6).required().messages({
        'string.min': 'Coach name must be at least 6 characters long',
        'any.required': 'Coach name is required',
        'string.empty': 'Coach name cannot be empty'
    }),
    players: Joi.array().items(
        Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'Player name is required',
                'string.empty': 'Player name cannot be empty'
            })
        })
    ),
    championshipsWon: Joi.number().default(0)
}).messages({
    'object.base': 'Invalid input',
    'object.unknown': 'Invalid field: {{#label}}'
});

module.exports = {
    addSchema
};
