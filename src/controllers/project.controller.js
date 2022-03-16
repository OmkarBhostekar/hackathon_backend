const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');


const getProjects = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['title','tags']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await projectService.getProjects(filter, options);
    res.send(result);
});

const getProjectDetail = catchAsync(async (req, res) => {
  const project = await projectService.updateProject(req.params.projectId, req.body)
  res.send(project);
});

const createProject = catchAsync(async (req, res) => {
    const project = await projectService.createProject(req.user.id,req.body)
    res.send(project)
})

const updateProject = catchAsync(async (req, res) => {
    const project = await projectService.updateProject(req.params.projectId,req.body)
    res.send(project)
})

module.exports = {
    getProjects,
    getProjectDetail,
    createProject,
    updateProject
}