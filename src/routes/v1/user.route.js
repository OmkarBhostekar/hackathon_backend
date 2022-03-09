const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const profileController = require('../../controllers/profile.controller');

const router = express.Router();

router
  .route('/profile')
  .patch(auth(),profileController.updateProfile)

router
  .route('/profile/:id')
  .get(auth(),profileController.getProfile)

router.get('/search',auth(), profileController.searchProfile)

router
  .route('/friends/request')
  .get(auth(), profileController.getRequests)
  .post(auth(), profileController.addFriendRequest)

router
  .route('/friends')
  .get(auth(), profileController.getFriends)
  .post(auth(), profileController.addFriend)

router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);


router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
