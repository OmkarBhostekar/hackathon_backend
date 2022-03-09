const httpStatus = require('http-status');
const { Project } = require('../models');
const ApiError = require('../utils/ApiError');

const getProjects = async (filter, options) => {
    return await Project.paginate(filter, options);
}
 
const getProjectDetail = async (projectId) => {
    const project = await Project.findById(projectId)
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    return project;
}

const createProject = async (userId,projectBody) => {
    projectBody.owner = userId
    return Project.create(projectBody);
}

const updateProject = async (projectId, updateBody) => {
    const project = await Project.findById(projectId)
    if (!project) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
    }
    Object.assign(project, updateBody);
    await project.save();
    return project;
}

module.exports = {
    getProjects,
    getProjectDetail,
    createProject,
    updateProject
  };