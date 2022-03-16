const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

const getProfile = async (profileId) => {
        const user = await User.findById(profileId).populate({
          path:'skills',
          model: 'Tag'
        }).populate({
          path: 'projects tags',
          model: 'Project',
          populate: {
            path: 'tags',
            model: 'Tag'
          }
        });
        if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        return user;
    }
  
  const updateProfile = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  };
  
  const searchProfile = async (filter, options, keyword) => {
    const result = await User.find({name: { $regex: new RegExp(keyword, 'i') }})
      .populate({
        path: 'skills',
        model: 'Tag'
      })
      .populate({
        path: 'projects',
        model: 'Project'
      })
    return result
  };

const getRequests = async (userId) => {
    const user = await User.findById(userId).populate('friend_req')
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (!user.friend_req) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No Requests found');
    }
    return user.friend_req
};

const addFriendRequest = async (userId, frdId) => {
    const fd = await User.findById(frdId)
    if(!fd.friends.includes(userId)){
        const friend = await User.findByIdAndUpdate(frdId,{ $push: { friend_req: userId } })
        if (!friend) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
    }else
        throw new ApiError(httpStatus.BAD_REQUEST, 'Friend request is already sent');
};

const getFriends = async (userId) => {
    const user = await User.findById(userId).populate('friends')
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (!user.friends) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No Requests found');
    }
    return user.friends
};

const addFriend = async (userId, frdId) => {
    const me = await User.findById(userId)
    if(!me.friends.includes(frdId)){
        const friend = await User.findByIdAndUpdate(frdId,{ $push: { friends: userId } })
        if (!friend) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        await User.findByIdAndUpdate(userId,{ $push: { friends: frdId }, $pull: { friend_req: frdId }})
    }else{
        throw new ApiError(httpStatus.BAD_REQUEST, 'Already Added');
    }
};

module.exports = {
    getProfile,
    updateProfile,
    searchProfile,
    getRequests,
    addFriendRequest,
    getFriends,
    addFriend
  };