const Joi = require('joi');

const createProject = {
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
    }),
  };