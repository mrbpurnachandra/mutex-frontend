import Joi from 'joi'

export default Joi.object({
    name: Joi.string().trim().min(4).max(64).required(),
    email: Joi.string(),
    username: Joi.string().alphanum().min(4).max(64).required(),
    password: Joi.string().trim().min(4).required(),
})


