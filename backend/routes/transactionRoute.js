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
const {
  transactionUpload,
  transactionHistory,
  cashbacks,
} = require('../controllers/transactionController');

const transactionRouter = express.Router();

transactionRouter.post('/transaction/upload', protect, transactionUpload);
transactionRouter.get('/transaction/history', protect, transactionHistory);
transactionRouter.get('/transaction/cashbacks', protect, cashbacks);

module.exports = transactionRouter;
