const Joi = require('@hapi/joi');

// REGISTER DATA VALIDATION
const regiserValidation = data =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}

// LOGIN DATA VALIDATION
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}

const postValidation = data => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
    });
    return schema.validate(data);
}

module.exports.regiserValidation = regiserValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;