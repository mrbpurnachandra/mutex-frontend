import Joi from 'joi'
export default Joi.object({
    name: Joi.string().trim().min(4).max(64).required(),
    description: Joi.string().trim().min(16).max(500).required(),
})
