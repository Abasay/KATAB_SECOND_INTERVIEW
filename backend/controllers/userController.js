const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { cloudinaryImageUpload } = require('../helpers/cloudinaryImageUpload');

/**
 * Registers a new user with the provided information.
 * Route: POST /signup
 * Body:
 * {
 *   "data": {
 *     "firstName": "string",
 *     "lastName": "string",
 *     "email": "string",
 *     "password": "string",
 *     "profileImg": "string"
 *   }
 * }
 */
async function registerUser(req, res) {
  // await connectDB();
  const { firstName, lastName, email, password, profileImg } = req.body.data;
  const saltRounds = 10;
  console.log(req.body);

  try {
    const user = await UserModel.findOne({
      email: email,
    });
    if (user) {
      return res
        .status(500)
        .json({ success: false, data: { message: 'Email already exist.' } });
    }
    if (password?.length < 7 || password?.length === '') {
      return res.status(500).json({
        success: false,
        data: { message: 'Password must be more than 6 characters in length.' },
      });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const createUser = await UserModel.create({
      firstName,
      lastName,
      profileImg,
      email,
      password: hash,
      name: `${firstName} ${lastName}`,
    });
    // await createUser.save();
    console.log(createUser);
    return res.status(200).json({
      success: true,
      data: { message: 'Account successfully created.' },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: {
        message: 'An error occurred while creating an account for this user.',
      },
    });
  }
}

/**
 * Registers a new user using Google authentication.
 * Route: POST /signup/google
 * Body:
 * {
 *   "name": "string",
 *   "email": "string",
 *   "image": "string"
 * }
 */
async function googleRegisterUser(req, res) {
  // await connectDB();

  try {
    const { name, email, image } = req.body;
    console.log(req.body);
    let newToken;
    const user = await UserModel.findOne({
      email: email,
    });
    console.log(user);

    if (user && user.signInMethod === 'GOOGLE') {
      newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '15h',
      });
      return res
        .status(200)
        .json({ success: true, data: { email: email, token: newToken } });
    }
    if (user && user.signInMethod === 'SIGNUP') {
      return res.status(500).json({
        success: false,
        data: {
          message: 'Account already exist with this email used for signup',
        },
      });
    }

    const createUser = await UserModel.create({
      email,
      name,
      signInMethod: 'GOOGLE',
      profileImg: image,
    });
    const token = jwt.sign({ id: createUser._id }, process.env.JWT_SECRET, {
      expiresIn: '15h',
    });
    await createUser.updateOne({
      token: token,
    });

    return res.status(200).json({
      success: true,
      data: { token: token, email: createUser.email },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      data: {
        message: 'An error occurred while creating an accout for this user.',
      },
    });
  }
}

/**
 * Logs in a user with the provided credentials.
 * Route: POST /login
 * Body:
 * {
 *   "email": "string",
 *   "password": "string"
 * }
 */
const userLogin = async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const user = await UserModel.findOne({
      email: body.email,
    });
    if (!user) {
      return { success: false, data: { message: 'User does not exist.' } };
    }
    if (user.signInMethod === 'GOOGLE') {
      return res.status(500).json({
        success: false,
        data: {
          message: 'Account was created with google, please login with google.',
        },
      });
    }

    const checkPassword = await bcrypt.compare(body.password, user.password);

    if (checkPassword) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '15h',
      });
      await user.updateOne({
        token: token,
      });
      console.log(user);
      // const admins = await AdminModel.find({});
      // const checkAdmin = admins[0]?.admins.filter(
      //   (admin) => admin.adminEmail === user.email
      // );
      return res
        .status(200)
        .json({ success: true, data: { email: user.email, token: token } });
    } else {
      return res.status(500).json({
        success: false,
        data: { message: 'incorrect password, please check and try again.' },
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: { message: 'error logging in...' } });
  }
};

/**
 * Logs in a user with Google authentication.
 * Route: POST /login/google
 * Body:
 * {
 *   "email": "string",
 *   "name": "string",
 *   "image": "string"
 * }
 */
const userLoginWithGoogle = async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const user = await UserModel.findOne({
      email: body.email,
      profileImg: body.image,
      name: body.name,
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, data: { message: 'user does not exist.' } });
    }
    if (user.signInMethod === 'SIGNUP') {
      return res.status(500).json({
        success: false,
        data: {
          message:
            'Account was created with email and password, please login with your email and password.',
        },
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15h',
    });
    await user.updateOne({
      token: token,
    });
    console.log(user);
    // const admins = await AdminModel.find({});
    // const checkAdmin = admins[0]?.admins.filter(
    //   (admin) => admin.adminEmail === user.email
    // );
    return res
      .status(200)
      .json({ success: true, data: { email: user.email, token: token } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: { message: 'error logging in...' } });
  }
};

/**
 * Generates a URL for uploading user profile images to Cloudinary.
 * Route: POST /user/image-url-generate
 * Body:
 * {
 *   "image": "string in base64"
 * }
 */
async function imageUrlGenerate(req, res) {
  const body = req.body;
  try {
    const imageUrl = await cloudinaryImageUpload(body.image);
    req.body = '';
    // if (imageUrl) {
    //   await fetch('http://localhost:5050')
    //     .then((resp) => console.log('req.body reset'))
    //     .catch((err) => console.log(err));
    // }
    return res.status(200).json({ success: true, data: imageUrl });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, data: 'Failed to upload' });
  }
}

/**
 * Retrieves user information by email.
 * Route: GET /user/:userEmail
 */

const getUser = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, data: { message: 'User not found' } });
    }
    return res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: { message: 'error fetching user' } });
  }
};

module.exports = {
  registerUser,
  googleRegisterUser,
  userLogin,
  getUser,
  imageUrlGenerate,
  userLoginWithGoogle,
};
