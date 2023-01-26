import Joi from 'joi'

export default Joi.object({
    description: Joi.string().trim().min(16).max(500).required(),
})
