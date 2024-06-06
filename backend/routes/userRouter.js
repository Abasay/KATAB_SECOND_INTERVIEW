const express = require('express');
const {
  registerUser,
  userLogin,
  googleRegisterUser,
  getUser,
  imageUrlGenerate,
  userLoginWithGoogle,
  forgetPassword,
  resetPassword,
  speakeasygen,
  speakeasyverify,
  emailAuthentication,
  confirmOTP,
  deleteAdmin,
  changeRole,
} = require('../controllers/userController');

const protect = require('../middlewares/authHandler');

const userRouter = express.Router();

userRouter.post('/user/generate2fa', speakeasygen)
userRouter.post('/signup', registerUser);
userRouter.post('/login', userLogin);

userRouter.post('/user/verify2fa', speakeasyverify)

userRouter.post('/signup/google', googleRegisterUser);
userRouter.get('/user/:userEmail', protect, getUser);
userRouter.post('/user/image-url-generate', imageUrlGenerate);

userRouter.post('/login/google', userLoginWithGoogle);
userRouter.post('/user/forgetpassword', forgetPassword)
userRouter.post('/user/resetpassword', resetPassword)
userRouter.post('/user/otp', emailAuthentication)
userRouter.post('/user/verifyotp', confirmOTP)
userRouter.patch('/user/removeadmin', deleteAdmin)
userRouter.get('/user/changerole', changeRole)


module.exports = userRouter;
