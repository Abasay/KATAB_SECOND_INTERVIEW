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
  registerAdmin,
  setPassPhrase,
  verifyPassPhrase,
  getAuthenticationOptions,
  verifyAuthentication,
  verifyPassPhraseLogin,
  getSmsOTP,
  verifySmsOtp,
  getAuthsEnabled,
  disableAuths,
  uploadRoles,
  getRoles,
  getRolesForAdmin,
} = require('../controllers/userController');

const protect = require('../middlewares/authHandler');

const userRouter = express.Router();

userRouter.get('/user/changerole', changeRole);
userRouter.get('/user/:userEmail', protect, getUser);

userRouter.get('/user/roles', getRolesForAdmin);

userRouter.post('/user/generate2fa', speakeasygen);
userRouter.post('/signup', registerUser);
userRouter.post('/login', userLogin);

//Admin
userRouter.post('/user/admin/signup', registerAdmin);
userRouter.post('/user/upload-roles', uploadRoles);

//Auths
userRouter.post('/user/verify2fa', speakeasyverify);
userRouter.post('/user/forgetpassword', forgetPassword);
userRouter.post('/user/resetpassword', resetPassword);
userRouter.post('/user/otp', emailAuthentication);
userRouter.post('/user/verifyotp', confirmOTP);

userRouter.post('/user/setpassphrase', setPassPhrase);
userRouter.post('/user/verifypassphrase', verifyPassPhrase);
userRouter.post('/user/getPassphrase', getAuthenticationOptions);
userRouter.post('/user/verifyPassPhraseLogin', verifyPassPhraseLogin);

userRouter.post('/signup/google', googleRegisterUser);
userRouter.post('/user/image-url-generate', imageUrlGenerate);

userRouter.post('/login/google', userLoginWithGoogle);

userRouter.delete('/user/removeadmin', deleteAdmin);
userRouter.patch('/user/update-role', changeRole);
userRouter.post('/user/roles', getRoles);

userRouter.post('/user/sms-otp', getSmsOTP);
userRouter.post('/user/verify-sms-otp', verifySmsOtp);
userRouter.post('/user/auths', getAuthsEnabled);
userRouter.post('/user/disableAuth', disableAuths);

module.exports = userRouter;
