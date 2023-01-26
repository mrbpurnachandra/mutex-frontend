import Joi from 'joi'

export default Joi.object({
    classId: Joi.number().required(),
})
