
const express = require('express');
const auth = require('../../middlewares/auth');
const Joi = require('joi');
const validate = require('../../middlewares/validate');

const tagController = require('../../controllers/tag.controller');

const tagValidator = {
    body: Joi.object().keys({
      name: Joi.string().required()
    }),
  };

const router = express.Router();
router
  .route('/')
  .get(tagController.getTags)
  .post(auth(),validate(tagValidator),tagController.addTag)

router
  .route('/search')
  .post(auth(),tagController.searchTag)


  module.exports = router;