const express = require('express');
const {
  registerUser,
  userLogin,
  googleRegisterUser,
  getUser,
  imageUrlGenerate,
  userLoginWithGoogle,
} = require('../controllers/userController');

const protect = require('../middlewares/authHandler');

const userRouter = express.Router();

userRouter.post('/signup', registerUser);
userRouter.post('/login', userLogin);
userRouter.post('/signup/google', googleRegisterUser);
userRouter.get('/user/:userEmail', protect, getUser);
userRouter.post('/user/image-url-generate', imageUrlGenerate);

userRouter.post('/login/google', userLoginWithGoogle);

module.exports = userRouter;
