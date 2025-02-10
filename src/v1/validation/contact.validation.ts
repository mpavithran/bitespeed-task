import Joi from 'joi';

export default {
  identify: Joi.object().keys({
    email: Joi.string().optional().allow(null, '').email(),
    phoneNumber: Joi.number().optional().allow(null, '')
  }),
};