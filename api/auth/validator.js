const Joi = require('joi');

const schemas = {
    router: {
        registration: Joi.object().keys({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }).required(),

        login: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }).required(),
    },
};

module.exports = {
    schemas,
};
