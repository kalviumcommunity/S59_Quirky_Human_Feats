// joivalidation.js
const Joi = require('joi');

const dataValidationSchema = Joi.object({
    Category: Joi.string().required(),
    Quirk: Joi.string().required(),
    Level: Joi.string().required(),
    Name: Joi.string().required()
});

const validateData = (data) => {
    const { error, value } = dataValidationSchema.validate(data, { abortEarly: false });
    if (error) {
        return {
            error: error.details.map(err => ({
                message: err.message,
                path: err.path,
                type: err.type,
                context: err.context
            })),
            value
        };
    }
    return { error: null, value };
};

module.exports = {
    validateData
};
