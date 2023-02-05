import Joi from 'joi'

export default Joi.object({
    teacherId: Joi.number().required(),
    subject: Joi.string().trim().min(2).max(64).required(),
})
