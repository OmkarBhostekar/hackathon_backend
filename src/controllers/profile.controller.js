const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const getProfile = catchAsync(async (req, res) => {
    const pId = req.params.id
    const result = await userService.getProfile(pId)
    res.send(result);
});

const updateProfile = catchAsync(async (req, res) => {
  const user = await userService.updateProfile(req.user.id, req.body)
  res.send(user);
});

const updategitToken = catchAsync(async (req, res) => {
  const user = await userService.updategitToken(req.body.token,req.user.id)

  res.send(user);
});
const updatefireToken = catchAsync(async (req, res) => {
  const user = await userService.updatefireToken(req.body.token,req.user.id)

  res.send(user);
});

module.exports = {
    getProfile,
    updateProfile,
    updategitToken,
    updatefireToken
}