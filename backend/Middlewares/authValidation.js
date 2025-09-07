const Joi = require('joi');

// Register validation schema
const signupValidation = (req,res,next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad Request",error 
        });
    }
    next();
};

// Login validation schema
const loginValidation = (req,res,next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
   });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad Request",error 
        });
    }
    next();
};
module.exports = { signupValidation, loginValidation };