const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { cloudinaryImageUpload } = require('../helpers/cloudinaryImageUpload');
const decryptSymmetric = require('../middlewares/cryptoDecrypt');
const sendEmail = require('../middlewares/sendEmail');
const qrcode = require('qrcode');
const speakeasy = require('speakeasy');

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
  const { firstName, lastName, email, password, profileImg, iv, role } = req.body.data;
  const saltRounds = 10;
  console.log(req.body);

  const passwordEncoded = await decryptSymmetric(req.body.data.passwordNew, iv, process.env.CRYPTOKEY)

  const checkPassword = await bcrypt.compare('Asheem1Asheem1', passwordEncoded);
  console.log(checkPassword)


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
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(password, salt);
    const createUser = await UserModel.create({
      firstName,
      lastName,
      profileImg,
      email,
      password: passwordEncoded,
      name: `${firstName} ${lastName}`,
      role: role,
      isAdmin: role !== 'user' ? true: false
    });
    // await createUser.save();
    //console.log(createUser);
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
    //console.log(req.body);
    let newToken;
    const user = await UserModel.findOne({
      email: email,
    });
    //console.log(user);

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
    //console.log(error);

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

    const passwordEncoded = await decryptSymmetric(req.body.passwordNew, req.body.iv, process.env.CRYPTOKEY)
    console.log(passwordEncoded)


    const checkPassword = await bcrypt.compare(passwordEncoded, user.password);
    console.log(checkPassword);

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
        
      if(user.isAdmin){
        const mail = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Notification Admins</title>
</head>
<body>
  <h1>Hi ADMIN,</h1>
  <p>${user.email} Just Logged In to their account.</p>
  <p>The CandM Transport Services Team</p>
</body>
</html>
    `

    const sendMail = await sendEmail(process.env.ADMIN, 'Login Notification', mail)
      }

       const mail = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Notification</title>
</head>
<body>
  <h1>Hi ADMIN,</h1>
  <p>${user.email} Just Logged In to their account.</p>
  <p>The CandM Transport Services Team</p>
</body>
</html>
    `

    const sendMail = await sendEmail(user.email, 'Login Notification', mail)
      
      return res
        .status(200)
        .json({ success: true, data: { email: user.email, token: token, isMainAdmin:user.isMainAdmin, isAdmin:user.isAdmin } });
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

const forgetPassword = async(req, res)=>{
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return { success: false, data: { message: 'User does not exist.' } };
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '10m',
      });

       user.refereshToken = token
       await user.save()

      const mail = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>
<body>
  <h1>Hi ${user.name? user.name : user.firstName},</h1>
  <p>We received a request to reset your password for your account on CandM Transport Services.</p>
  <p>Click the link below to set a new password:</p>
  <a href="http://localhost:3000/auth/reset?token=${token}">Reset Your Password</a>
  <p><b>This link will expire in 10 mins.</b></p>
  <p>If you did not request a password reset, you can safely ignore this email.</p>
  <p>Sincerely,</p>
  <p>The CandM Transport Services Team</p>
</body>
</html>
    `

    const sendMail = await sendEmail(req.body.email, 'Password Reset', mail)
    console.log(sendMail)
    return res.status(200).json({
      success:true, data:'Reset Link Sent'
    })

  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, data: { message: 'error logging in...' } });
  }
  
}

const changeRole = async(req, res)=>{
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return { success: false, data: { message: 'User does not exist.' } };
    }
    user.role = req.body.role
    await user.save()

    return res.status(200).json({
      success:true, data:'Role Changed'
    })

  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, data: { message: 'error logging in...' } });
  }
}

const deleteAdmin = async(req, res)=>{
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return { success: false, data: { message: 'User does not exist.' } };
    }
    user.role = 'user'
    await user.save()

    return res.status(200).json({
      success:true, data:'Admin Authority Removed'
    })

  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, data: { message: 'error logging in...' } });
  }
}

const resetPassword = async(req, res)=>{
  console.log(req.body)
  try {
    const user = await UserModel.findOne({
      refereshToken: req.body.data.token,
    });
    console.log(user)
    if (!user) {
      return { success: false, data: { message: 'User does not exist.' } };
    }
        console.log(user.password)


    const passwordEncoded = await decryptSymmetric(req.body.data.passwordNew, req.body.data.iv, process.env.CRYPTOKEY)

    const updateUser = await user.updateOne({
      password: passwordEncoded,
      refereshToken: ''
    })

    // user.password = passwordEncoded
    console.log(passwordEncoded)
    // user.refereshToken = ''
    // await user.save()

    return res.status(200).json({
      success:true, data:'Password Reset Successful'
    })

  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, data: { message: 'error logging in...' } });
  }
}
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
  //console.log(body);
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
    //console.log(user);
    // const admins = await AdminModel.find({});
    // const checkAdmin = admins[0]?.admins.filter(
    //   (admin) => admin.adminEmail === user.email
    // );
    return res
      .status(200)
      .json({ success: true, data: { email: user.email, token: token } });
  } catch (error) {
    //console.log(error);
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
    //     .then((resp) => //console.log('req.body reset'))
    //     .catch((err) => //console.log(err));
    // }
    return res.status(200).json({ success: true, data: imageUrl });
  } catch (error) {
    //console.log(error);
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
    return res.status(200).json({ success: true, data: {isMainAdmin: user.isMainAdmin}} );
  } catch (error) {
    //console.log(error);
    return res
      .status(500)
      .json({ success: false, data: { message: 'error fetching user' } });
  }
};


const speakeasygen =async (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  const otpauth_url = secret.otpauth_url;

  const user = await UserModel.findOneAndUpdate({
    email:req.body.email
  },{secret2FA: secret.base32})

  qrcode.toDataURL(otpauth_url, (err, data_url) => {
    if (err) {
      res.status(500).json({ message: 'Error generating QR code' });
      return;
    }
    res.status(200).json({ secret: secret.base32, qrCode: data_url });
  });
};


const speakeasyverify = async (req, res) => {
  const { token, secret, email } = req.body;

  const user = await UserModel.findOne({
    email:email
  })

  if (!user) {
      return res
        .status(400)
        .json({ success: false, data: { message: 'User not found' } });
    }

  const verified = speakeasy.totp.verify({
    secret: user.secret2FA,
    encoding: 'base32',
    token: token,
  });
  console.log(verified)

  if (verified) {
    res.status(200).json({ verified: true });
  } else {
    res.status(400).json({ verified: false });
  }
};


const emailAuthentication = async(req, res)=>{
  const salt = bcrypt.genSaltSync(10);
  try {
    const user = await UserModel.findOne({
      email: req.body.email
    })

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const hash = bcrypt.hashSync(otp, salt);
      user.otp = hash 
      user.otpExpire = Date.now() + 600000
      await user.save()

    const mail = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
        }
        .content {
            margin: 20px 0;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #007BFF;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888888;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your OTP Code</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) for verification is:</p>
            <p class="otp-code">${otp}</p>
            <p>This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
        </div>
        <div class="footer">
            <p>If you did not request this code, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
`

    const sendMail = await sendEmail(user.email, 'Login Verification', mail)
    console.log(sendMail)
    return res.status(200).json({
      success:true, data:'OTP Sent'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false, data:'Error Occured'})
  }
}


const confirmOTP = async(req, res)=>{
  try {
    const user = await UserModel.findOne({
      email: req.body.email
    })

    if(!bcrypt.compare(user.otp, req.body.token)){
      return res.status(400).json({success:false, data:'Invalid OTP'})
    }

    if(user.otpExpire < Date.now()){
      return res.status(400).json({success:false, data:'OTP Expired'})
    }

    return res.status(200).json({success:true, data:'OTP Confirmed'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false, data:'Error Occured'})
  }
}
module.exports = {
  registerUser,
  googleRegisterUser,
  userLogin,
  getUser,
  imageUrlGenerate,
  userLoginWithGoogle,
  forgetPassword, resetPassword, speakeasygen, speakeasyverify, emailAuthentication, confirmOTP, deleteAdmin, changeRole
};
