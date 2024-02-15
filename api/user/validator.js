const Joi = require('joi');

const schemas = {
    router: {
        userList: Joi.object().keys({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        }).optional(),

        updateUser: Joi.object().keys({
            first_name: Joi.string().optional(),
            last_name: Joi.string().optional(),
            email: Joi.string().email().optional(),
        }).optional(),

        resetPassword: Joi.object().keys({
            resetLink: Joi.string().required(),
            newPassword: Joi.string().required(),
            confirmNewPassword: Joi.string().required(),
        }).required(),
    },
};

module.exports = {
    schemas,
};
