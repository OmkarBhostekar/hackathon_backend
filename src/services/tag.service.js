const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const userService = require('./user.service');
const { Tag } = require('../models');
const ApiError = require('../utils/ApiError');

const getTags = async () => {
    const tag = await Tag.find()
    if (!tag) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Tags not found');
    }
    return tag;
  }

  const addTag = async(name) => {
      const tag = await Tag.create({name: name})
      if (!tag) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Tags not found');
      }
      return tag
  }



  const searchTag = async (key) => {
    const result = await Tag.find({name: { $regex: new RegExp(key, 'i') }})
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found');
    }
    return result;
  }
module.exports = {
    getTags,
    addTag,
    searchTag   
 
};
