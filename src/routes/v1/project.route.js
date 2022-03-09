const express = require('express');
const auth = require('../../middlewares/auth');
const projectController = require('../../controllers/project.controller');
const validate = require('../../middlewares/validate');
const projectValidation = require('../../validations/project.validation');


const router = express.Router();
router
  .route('/')
  .get(auth(), projectController.getProjects)
  .post(auth(), validate(projectValidation.createProject), projectController.createProject)

router
  .route('/:projectId')
    .get(auth(), projectController.getProjectDetail)
    .patch(auth(), projectController.updateProject)

module.exports = router;