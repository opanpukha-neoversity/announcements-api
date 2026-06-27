import { celebrate, Joi, Segments } from 'celebrate'

const idParamSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().integer().positive().required(),
  }),
}

const createBodySchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().valid('sale', 'service', 'job', 'other').required(),
  contactInfo: Joi.string().min(5).required(),
})

const updateBodySchema = Joi.object({
  title: Joi.string().min(5).max(100).optional(),
  description: Joi.string().min(10).optional(),
  price: Joi.number().positive().optional(),
  category: Joi.string().valid('sale', 'service', 'job', 'other').optional(),
  contactInfo: Joi.string().min(5).optional(),
}).min(1)

export const listAnnouncementsValidator = celebrate({
  [Segments.QUERY]: Joi.object({
    search: Joi.string().allow('').optional(),
    sort: Joi.string().valid('newest', 'oldest').optional(),
    page: Joi.number().integer().positive().optional(),
  }),
})

export const getAnnouncementByIdValidator = celebrate(idParamSchema)

export const createAnnouncementValidator = celebrate({
  [Segments.BODY]: createBodySchema,
})

export const updateAnnouncementValidator = celebrate({
  ...idParamSchema,
  [Segments.BODY]: updateBodySchema,
})

export const deleteAnnouncementValidator = celebrate(idParamSchema)
