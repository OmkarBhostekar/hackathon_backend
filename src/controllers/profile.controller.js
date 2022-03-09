const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { profileService } = require('../services');

const getProfile = catchAsync(async (req, res) => {
    const pId = req.params.id
    const result = await profileService.getProfile(pId)
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

const searchProfile = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await profileService.searchProfile(filter, options,req.query.key);
    res.send(result);
  });

const getRequests = catchAsync(async (req, res) => {
    const result = await profileService.getRequests(req.user.id)
    res.send(result);
});

const addFriendRequest = catchAsync(async (req, res) => {
    await profileService.addFriendRequest(req.user.id, req.body.frdId)
    res.status(httpStatus.OK)
        .json({
            "status": 200,
            "message": "friend request sent"
        })
});

const getFriends = catchAsync(async (req, res) => {
    const result = await profileService.getFriends(req.user.id)
    res.send(result);
});

const addFriend = catchAsync(async (req, res) => {
    await profileService.addFriend(req.user.id, req.body.frdId)
    res.status(httpStatus.OK)
        .json({
            "status": 200,
            "message": "friend added"
        })
});

module.exports = {
    getProfile,
    updateProfile,
    updategitToken,
    updatefireToken,
    searchProfile,
    getRequests,
    addFriendRequest,
    getFriends,
    addFriend
}