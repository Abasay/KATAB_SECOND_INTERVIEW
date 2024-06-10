const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { cloudinaryImageUpload } = require('../helpers/cloudinaryImageUpload');
const decryptSymmetric = require('../middlewares/cryptoDecrypt');
const sendEmail = require('../middlewares/sendEmail');
const qrcode = require('qrcode');
const speakeasy = require('speakeasy');
const AdminModel = require('../models/adminModel');
const getLocationDetails = require('../helpers/geoLocation');
const passPhraseHandler = require('../helpers/passphrase');
const {
  verifyPassPhraseHandler,
  verifyPassPhraseLoginHandler,
} = require('../helpers/verifyPassPhrase');
const { Fido2Lib } = require('fido2-lib');
const { default: base64url } = require('base64url');
const { smsOTP, verifyOtp } = require('../middlewares/twilioOTP');
const LoginHistoryModel = require('../models/loginHistoryModel');
const AdminTypeModel = require('../models/rolesModel');

const fido2 = new Fido2Lib({
  timeout: 60000,
  rpId: 'localhost',
  rpName: process.env.APP_NAME,
  challengeSize: 32,
  authenticatorRequireResidentKey: false,
  authenticatorUserVerification: 'preferred',
});

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
  const { email, password, iv, passPhrase, passPhraseIv } = req.body.data;
  const saltRounds = 10;
  console.log(req.body);

  const passwordEncoded = await decryptSymmetric(
    req.body.data.passwordNew,
    iv,
    process.env.CRYPTOKEY
  );

  const checkPassword = await bcrypt.compare('Asheem1Asheem1', passwordEncoded);
  console.log(checkPassword);

  const encryptedPassPhrase = await decryptSymmetric(
    passPhrase,
    passPhraseIv,
    process.env.CRYPTOKEY
  );
  console.log(encryptedPassPhrase);

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
    // const hash = bcrypt.hashSync(password, salt);
    const createUser = await UserModel.create({
      email,
      password: passwordEncoded,
      passPhrase: bcrypt.hashSync(encryptedPassPhrase, salt),
      authEnabled: ['passPhrase-auth'],
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

async function registerAdmin(req, res) {
  // await connectDB();
  const {
    firstName,
    lastName,
    email,
    password,
    profileImg,
    iv,
    role,
    passPhrase,
    passPhraseIv,
  } = req.body.data;
  const saltRounds = 10;
  console.log(req.body);

  const passwordEncoded = await decryptSymmetric(
    req.body.data.passwordNew,
    iv,
    process.env.CRYPTOKEY
  );

  const checkPassword = await bcrypt.compare('Asheem1Asheem1', passwordEncoded);
  console.log(checkPassword);

  const encryptedPassPhrase = await decryptSymmetric(
    passPhrase,
    passPhraseIv,
    process.env.CRYPTOKEY
  );

  try {
    const user = await UserModel.findOne({
      email: email,
    });
    if (user) {
      return res.status(500).json({
        success: false,
        data: { message: 'Admin already exist with a role.' },
      });
    }
    if (password?.length < 12 || password?.length === 0) {
      return res.status(500).json({
        success: false,
        data: { message: 'Password must be more than 6 characters in length.' },
      });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(password, salt);
    const createUser = await UserModel.create({
      firstName,
      lastName,
      profileImg,
      email,
      password: passwordEncoded,
      name: `${firstName} ${lastName}`,
      role: role,
      isAdmin: role !== 'user' ? true : false,
      isMainAdmin: email === process.env.ADMIN,
      passPhrase: bcrypt.hashSync(encryptedPassPhrase, salt),
    });
    // await createUser.save();
    //console.log(createUser);

    if (email === process.env.ADMIN) {
      const mail = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Creation Successful</title>
        </head>
        <body>
          <h1>Hi ${firstName},</h1>
          <p>Your account has been successfully created.</p>
          <p>The CandM Transport Services Team</p>
        </body>
      </html>
    `;

      const sendMail = await sendEmail(
        process.env.ADMIN,
        'Account Creatio Notification',
        mail
      );
    } else {
      const mail = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Creation Successful</title>
        </head>
        <body>
          <h1>Hi ${email},</h1>
          <p>An account has been successfully created for you.</p>
          <p>Plese reset your password to login <a href="${process.env.CLIENT_SITE_LINK}/login">here</a></p>
          <p>The CandM Transport Services Team</p>
        </body>
      </html>
    `;

      const sendMail = await sendEmail(
        process.env.ADMIN,
        'Account Creatio Notification',
        mail
      );
    }
    return res.status(200).json({
      success: true,
      data: { message: 'Account successfully created.' },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: {
        message: 'An error occurred while creating an account for this admin.',
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
  const { email, lat, long, passwordNew, iv, passPhrase, passPhraseIv } =
    req.body;
  try {
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return { success: false, data: { message: 'User does not exist.' } };
    }

    let loginHistory;
    loginHistory = await LoginHistoryModel.findOne({
      user: user._id,
    });

    if (user.signInMethod === 'GOOGLE') {
      return res.status(500).json({
        success: false,
        data: {
          message: 'Account was created with google, please login with google.',
        },
      });
    }

    const passwordEncoded = await decryptSymmetric(
      passwordNew,
      iv,
      process.env.CRYPTOKEY
    );
    console.log(passwordEncoded);

    const passPhraseEncoded = await decryptSymmetric(
      passPhrase,
      passPhraseIv,
      process.env.CRYPTOKEY
    );
    console.log(passPhraseEncoded);

    // const logginInFrom = await getLocationDetails(lat, long)
    const logginInFrom = 'Ikeja';

    const checkPassword = await bcrypt.compare(passwordEncoded, user.password);
    console.log(checkPassword);

    if (checkPassword) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '15h',
      });

      const pasCheck = await bcrypt.compare(passPhraseEncoded, user.passPhrase);
      console.log(pasCheck);

      if (!(await bcrypt.compare(passPhraseEncoded, user.passPhrase))) {
        return res.status(500).json({
          success: false,
          data: {
            message: 'incorrect pass phrase, please check and try again.',
          },
        });
      }

      if (loginHistory) {
        loginHistory.loginHistories.push({
          latitude: lat,
          longitude: long,
          location: logginInFrom,
          // location:logginInFrom
        });
        await loginHistory.save();
      } else {
        loginHistory = await LoginHistoryModel.create({
          latitude: lat,
          longitude: long,
          location: logginInFrom,
          // location:logginInFrom
        });
      }
      await user.updateOne({
        token: token,
      });
      console.log(user);
      // const admins = await AdminModel.find({});
      // const checkAdmin = admins[0]?.admins.filter(
      //   (admin) => admin.adminEmail === user.email
      // );

      if (user.isAdmin) {
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
          <p>${user.email} Just Logged In to their account from ${logginInFrom}.</p>
          <p>The CandM Transport Services Team</p>
        </body>
      </html>
    `;

        const sendMail = await sendEmail(
          process.env.ADMIN,
          'Login Notification',
          mail
        );
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
          <h1>Hi ${user.email},</h1>
          <p>You Just Logged In to your account from ${logginInFrom}.</p>
            <p>If it is not you, please reset your password by clicking <a href="${process.env.CLIENT_SITE_LINK}/auth/signin">here</a> and click on forgot password.</p>
          <p>The CandM Transport Services Team</p>
        </body>
      </html>
    `;

      const sendMail = await sendEmail(user.email, 'Login Notification', mail);

      return res.status(200).json({
        success: true,
        data: {
          email: user.email,
          token: token,
          isMainAdmin: user.isMainAdmin,
          isAdmin: user.isAdmin,
          authEnabled: user.authEnabled,
        },
      });
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

function arrayBufferToBase64url(buffer) {
  return base64url(new Uint8Array(buffer));
}

async function getAuthenticationOptions(req, res) {
  const { username } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(400).send('User not found');
    }

    const authnOptions = await fido2.assertionOptions();
    authnOptions.challenge = arrayBufferToBase64url(authnOptions.challenge);
    authnOptions.allowCredentials = user.webauthnCredentials.map((cred) => ({
      type: 'public-key',
      id: cred.credId,
      transports: cred.transports || ['usb', 'ble', 'nfc'],
      // publicKey: cred.publicKey,
    }));

    user.passphraseChallenge = authnOptions.challenge;
    await user.save();

    res.json(authnOptions);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}

function base64urlToArrayBuffer(base64urlString) {
  return Uint8Array.from(base64url.toBuffer(base64urlString)).buffer;
}

async function verifyAuthentication(req, res) {
  const { username, attestationResponse } = req.body;
  const assertionResponse = attestationResponse;

  try {
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(400).send('User not found');
    }

    const clientAssertion = {
      rawId: base64urlToArrayBuffer(assertionResponse.rawId),
      response: {
        clientDataJSON: base64urlToArrayBuffer(
          assertionResponse.response.clientDataJSON
        ),
        authenticatorData: base64urlToArrayBuffer(
          assertionResponse.response.authenticatorData
        ),
        signature: base64urlToArrayBuffer(assertionResponse.response.signature),
        userHandle:
          assertionResponse.response?.userHandle &&
          base64urlToArrayBuffer(assertionResponse.response.userHandle),
      },
    };

    const expectations = {
      challenge: user.passphraseChallenge,
      origin: 'http://localhost',
      factor: 'either',
      prevCounter: user.webauthnCredentials[0].counter,
      publicKey: user.webauthnCredentials[0].publicKey,
      userHandle: clientAssertion.response.userHandle,
      clientDataJSON: base64urlToArrayBuffer(
        user.webauthnCredentials[0].clientDataJSON
      ),
    };

    const authnResult = await fido2.assertionResult(
      clientAssertion,
      expectations
    );

    if (authnResult.authnrData.get('flags').has('UP')) {
      res.json({ status: 'ok' });
    } else {
      res.status(400).send('Authentication failed');
    }
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).send('An error occurred');
  }
}

async function setPassPhrase(req, res) {
  try {
    const { email, username } = req.body;
    const challengePassPhrase = await passPhraseHandler(email, username);

    return res.status(200).json({ success: true, ...challengePassPhrase });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, data: 'An error occurred' });
  }
}

async function verifyPassPhrase(req, res) {
  try {
    const { email, attestationResponse } = req.body;
    const user = await UserModel.findOne({
      email: email,
    });

    if (!email || !attestationResponse) {
      return res.status(400).json({ success: false, data: 'Invalid request' });
    }

    const verify = await verifyPassPhraseHandler(email, attestationResponse);
    if (verify.status === 'ok') {
      user.authEnabled.push('passkey-auth');
      await user.save();
    }
    return res.status(200).json(verify);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, data: 'An error occurred' });
  }
}

async function verifyPassPhraseLogin(req, res) {
  try {
    const { email, assertionResponse } = req.body;

    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({ success: false, data: 'User not found' });
    }

    if (!email || !assertionResponse) {
      return res.status(400).json({ success: false, data: 'Invalid request' });
    }

    const verify = await verifyPassPhraseLoginHandler(email, assertionResponse);
    if (verify.status === 'ok') {
      user.authEnabled.push('passkey-auth');
      await user.save();
    }
    return res.status(200).json(verify);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, data: 'An error occurred' });
  }
}

const forgetPassword = async (req, res) => {
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

    user.refereshToken = token;
    await user.save();

    const mail = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>
<body>
  <h1>Hi ${user.name ? user.name : user.firstName},</h1>
  <p>We received a request to reset your password for your account on CandM Transport Services.</p>
  <p>Click the link below to set a new password:</p>
  <a href="http://localhost:3000/auth/reset?token=${token}">Reset Your Password</a>
  <p><b>This link will expire in 10 mins.</b></p>
  <p>If you did not request a password reset, you can safely ignore this email.</p>
  <p>Sincerely,</p>
  <p>The CandM Transport Services Team</p>
</body>
</html>
    `;

    const sendMail = await sendEmail(req.body.email, 'Password Reset', mail);
    console.log(sendMail);
    return res.status(200).json({
      success: true,
      data: 'Reset Link Sent',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: { message: 'error logging in...' } });
  }
};

const changeRole = async (req, res) => {
  try {
    const { email, adminEmail, role } = req.body;
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return { success: false, data: { message: 'User does not exist.' } };
    }

    const admin = await UserModel.findOne({
      email: adminEmail,
    });
    if (!admin) {
      return { success: false, data: { message: 'Admin does not exist.' } };
    }
    admin.role = req.body.role;
    await admin.save();

    const admins = await UserModel.find({ isAdmin: true });
    return res.status(200).json({
      success: true,
      data: admins.map((admin) => {
        return {
          id: admin._id,
          email: admin.email,
          password: '1234567',
          role: admin.role,
        };
      }),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: { message: 'error logging in...' } });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return { success: false, data: { message: 'User does not exist.' } };
    }
    user.role = 'user';
    await user.save();

    return res.status(200).json({
      success: true,
      data: 'Admin Authority Removed',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: { message: 'error logging in...' } });
  }
};

const resetPassword = async (req, res) => {
  console.log(req.body);
  try {
    const user = await UserModel.findOne({
      refereshToken: req.body.data.token,
    });
    console.log(user);
    if (!user) {
      return { success: false, data: { message: 'User does not exist.' } };
    }
    console.log(user.password);

    const passwordEncoded = await decryptSymmetric(
      req.body.data.passwordNew,
      req.body.data.iv,
      process.env.CRYPTOKEY
    );

    const passwdCheck = await bcrypt.compare(passwordEncoded, user.password);

    if (passwdCheck) {
      return res.status(200).json({
        success: false,
        data: 'Please use a password different from the previous one.',
      });
    }

    const updateUser = await user.updateOne({
      password: passwordEncoded,
      refereshToken: '',
    });

    // user.password = passwordEncoded
    console.log(passwordEncoded);
    // user.refereshToken = ''
    // await user.save()

    return res.status(200).json({
      success: true,
      data: 'Password Reset Successful',
    });
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
    return res.status(200).json({
      success: true,
      data: { isMainAdmin: user.isMainAdmin, adminType: user.role },
    });
  } catch (error) {
    //console.log(error);
    return res
      .status(500)
      .json({ success: false, data: { message: 'error fetching user' } });
  }
};

const speakeasygen = async (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  const otpauth_url = secret.otpauth_url;

  const user = await UserModel.findOneAndUpdate(
    {
      email: req.body.email,
    },
    { secret2FA: secret.base32 }
  );

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
    email: email,
  });

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
  console.log(verified);

  if (verified) {
    user.authEnabled.push('authenticator-auth');
    await user.save();
    res.status(200).json({ verified: true });
  } else {
    res.status(400).json({ verified: false });
  }
};

const emailAuthentication = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hash = bcrypt.hashSync(otp, salt);
    user.otp = hash;
    user.otpExpire = Date.now() + 600000;
    await user.save();

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
`;

    const sendMail = await sendEmail(user.email, 'Login Verification', mail);
    console.log(sendMail);
    return res.status(200).json({
      success: true,
      data: 'OTP Sent',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, data: 'Error Occured' });
  }
};

const confirmOTP = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (!bcrypt.compare(user.otp, req.body.token)) {
      return res.status(400).json({ success: false, data: 'Invalid OTP' });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ success: false, data: 'OTP Expired' });
    }
    user.authEnabled.push('email-auth');
    await user.save();

    return res.status(200).json({ success: true, data: 'OTP Confirmed' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, data: 'Error Occured' });
  }
};

const getSmsOTP = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({ success: false, data: 'User not found' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const sendOtp = await smsOTP(req.body.phoneNumber);
    console.log(sendOtp);
    if (sendOtp === 'approved' || sendOtp === 'pending') {
      return res.status(200).json({ success: true, message: 'OTP Sent' });
    }
    return res.status(200).json({ success: true, message: 'OTP Sent' });
    // return res.status(500).json({ success: false, data: 'Error Occured' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: 'Error Occured' });
  }
};

const sendSmsOTP = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({ success: false, data: 'User not found' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const sendOtp = await smsOTP(user.phoneNumber);
    console.log(sendOtp);
    if (sendOtp === 'approved' || sendOtp === 'pending') {
      return res.status(200).json({ success: true, message: 'OTP Sent' });
    }
    return res.status(200).json({ success: true, message: 'OTP Sent' });
    // return res.status(500).json({ success: false, data: 'Error Occured' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: 'Error Occured' });
  }
};
const verifySmsOtp = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, data: 'User not found' });
    }
    const verifyOTP = await verifyOtp(req.body.otp);

    if (verifyOTP === 'approved' || verifyOTP === 'pending') {
      user.authEnabled.push('sms-auth');
      user.phoneNumber = req.body.phoneNumber;
      await user.save();
      return res.status(200).json({ success: true, message: 'OTP Confirmed' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: 'Error Occured' });
  }
};
const getAuthsEnabled = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(404).json({ success: false, message: 'user not found' });
    }

    return res
      .status(200)
      .json({ success: true, authsEnabled: user.authEnabled });
  } catch (error) {
    console.log(error);
  }
};

const uploadRoles = async (req, res) => {
  const { email, roles } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    console.log(roles);

    if (!user) {
      return res.status(404).json({
        success: false,
        data: 'User not found',
      });
    }

    // if (user.email !== process.env.ADMIN) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Not authorized to perform this action',
    //   });
    // }

    let createRoles;

    createRoles = await AdminTypeModel.findOne({
      admin: user._id,
    });

    if (createRoles) {
      createRoles.adminTypes.push(...roles);
      await user.save();
      await createRoles.save();
      return res.status(200).json({ success: true, data: 'uploaded' });
    } else {
      createRoles = await AdminTypeModel.create({
        admin: user._id,
        adminTypes: roles,
      });
      return res.status(200).json({ success: true, data: 'uploaded' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, data: 'error occurred' });
  }
};

const disableAuths = async (req, res) => {
  try {
    const { email, auth } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        data: 'User not found',
      });
    }

    user.authEnabled.pull(auth);
    await user.save();

    return res.status(200).json({ success: true, message: 'Auth disabled' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: 'An error occurred',
    });
  }
};

function rolesToString(rolesArray) {
  // Initialize a Set to hold unique roles
  let allRolesSet = new Set();

  // Loop through each object in the array
  rolesArray.forEach((obj) => {
    // Add the main role to the Set
    allRolesSet.add(obj.role);
    // Add each rolesAssignable to the Set
    obj.rolesAssignable.forEach((role) => allRolesSet.add(role));
  });

  // Convert the Set to an array and join all elements into a single string separated by commas
  return Array.from(allRolesSet).join(', ');
}

const getRoles = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        data: 'User not found',
      });
    }

    // const admin = await UserModel.findOne({
    //   email:process.env.ADMIN
    // })

    const rolesByMainAdmin = await AdminTypeModel.findOne({
      admin: user._id,
    });

    const allowedRoles = rolesByMainAdmin.adminTypes.find(
      (role) => role.role === user.role
    );

    console.log(allowedRoles.rolesAssignable);

    //  const rolesByMainAdmin = await AdminTypeModel.findOne({
    //    admin: admin._id,
    //  });

    console.log(user.isAdmin);

    if (user.isMainAdmin) {
      const roles = await AdminTypeModel.findOne({ admin: user._id });

      return res.status(200).json({
        success: true,
        data: rolesToString(roles.adminTypes).split(','),
      });
    } else if (user.isAdmin) {
      const roles = await AdminTypeModel.find({
        adminTypes: { $elemMatch: { role: user.role } },
      });

      return res
        .status(200)
        .json({ success: true, data: allowedRoles.rolesAssignable });
    } else {
      return res.status(200).json({ success: true, data: [] });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: 'An error occurred',
    });
  }
};

const getRolesForAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        data: 'User not found',
      });
    }

    const roles = await AdminTypeModel.findOne({ admin: user._id });

    // if (email === process.env.ADMIN && user.isMainAdmin) {
    //   return res.status(200).json({ success: true, data: roles });
    // }

    if (user.isMainAdmin) {
      return res.status(200).json({ success: true, data: roles.adminTypes });
    }

    return res
      .status(400)
      .json({ success: false, data: 'Not Authorized to perform this action' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: 'An error occurred',
    });
  }
};

const deleteRolesForAdmin = async (req, res) => {
  try {
    const { email, roleTitle } = req.body;

    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        data: 'User not found',
      });
    }

    if (!user.isMainAdmin) {
      return res.status(400).json({
        success: false,
        data: 'Not Authorized to perform this action',
      });
    }

    const roles = await AdminTypeModel.findOne({ admin: user._id });

    const removeRoles = roles.adminTypes.filter(
      (role) => role.role !== roleTitle
    );
    console.log(removeRoles);
    roles.adminTypes = removeRoles;
    await roles.save();

    // if (email === process.env.ADMIN && user.isMainAdmin) {
    //   return res.status(200).json({ success: true, data: roles });
    // }

    return res.status(200).json({ success: true, data: removeRoles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: 'An error occurred',
    });
  }
};

const getAdmins = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user || !user.isMainAdmin) {
      return res
        .status(404)
        .json({ success: false, data: 'User Not Authorized' });
    }
    const admins = await UserModel.find({ isAdmin: true });
    return res.status(200).json({
      success: true,
      data: admins.map((admin) => {
        return {
          id: admin._id,
          email: admin.email,
          password: '1234567',
          role: admin.role,
        };
      }),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, data: 'An error occurred' });
  }
};

const getLoginLocations = async () => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user || !user.isMainAdmin) {
      return res
        .status(404)
        .json({ success: false, data: 'User Not Authorized' });
    }
    const admins = await UserModel.find({ isAdmin: true });
    const loginHistory = await LoginHistoryModel.find({});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, data: 'An error occurred' });
  }
};
module.exports = {
  registerUser,
  googleRegisterUser,
  userLogin,
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
  uploadRoles,
  disableAuths,
  getRoles,
  getRolesForAdmin,
  deleteRolesForAdmin,
  sendSmsOTP,
  getAdmins,
};
