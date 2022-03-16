const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { tagService } = require('../services');

const addTag = catchAsync(async (req, res) => {
  const tag = await tagService.addTag(req.body.name);
  res.status(httpStatus.CREATED).send(tag);
});

const getTags = catchAsync(async (req, res) => {
  const result = await tagService.getTags();
  res.send(result);
});

const searchTag = catchAsync(async (req, res) => {
    const result = await tagService.searchTag(req.query.key);
    res.send(result);
});


module.exports = {
    addTag,
    getTags,
    searchTag,
  };
