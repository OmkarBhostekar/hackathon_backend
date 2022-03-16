const httpStatus = require('http-status');
const { User,Project } = require('../models');
const ApiError = require('../utils/ApiError');

const getProjects = async (filter, options) => {
    options.populate = 'tags'
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
    const project = await Project.create(projectBody);
    await User.findByIdAndUpdate(userId,{ $push: { projects: project.id } })
    return project
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