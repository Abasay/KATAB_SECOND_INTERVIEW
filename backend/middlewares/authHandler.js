const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        success: false,
        authorized: 'No token provided, user is unauthorized.',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        authorized: 'No token provided, user is unauthorized.',
      });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        authorized: 'Invalid token, user is unauthorized',
      });
    }

    const userId = decodedToken.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        authorized: 'User not found or unauthorized',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      authorized: 'Internal server error',
    });
  }
};

module.exports = protect;
