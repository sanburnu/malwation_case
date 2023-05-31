const Joi = require("joi");


// Register Validation 
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required().min(6),
        email: Joi.string().required().lowercase(),
        phone: Joi.string().required()
        .pattern(/^\d{3}-\d{3}-\d{4}$/)
        .message('Please provide a valid phone number in the format XXX-XXX-XXXX.'),
        role: Joi.string().required(),
        active: Joi.boolean().default(true)
    });
    return schema.validate(data);   
}

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().lowercase(),
        password: Joi.string().required().min(6),
    });
    return schema.validate(data);   
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;