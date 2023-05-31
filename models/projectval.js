const Joi = require("joi");


// Register Validation 
const projectValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        people: Joi.array(),
        active: Joi.boolean().default(true)
    });
    return schema.validate(data);   
}


module.exports = projectValidation;