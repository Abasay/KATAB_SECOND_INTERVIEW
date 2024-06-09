const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_SECRET;
console.log(authToken, accountSid);
const client = require('twilio')(accountSid, authToken);

const verifySid = process.env.TWILIO_VERIFY_SID;
console.log(verifySid);
console.log('SMS OTP');

const smsOTP = async (number) => {
  try {
    const send = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: '+2348145538570', channel: 'sms' })
      .then((verification) => {
        console.log(verification);
        return verification.status;
      });

    return send;
  } catch (error) {
    console.log(error);
    return 'Error occurred';
  }
};

const verifyOtp = async (otp) => {
  try {
    const verify = client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: '+2348145538570', code: otp })
      .then((verification_check) => {
        console.log(verification_check.status);
        return verification_check.status;
      });

    return verify;
  } catch (error) {
    console.log(error);
    return 'invalid otp';
  }
};

module.exports = { smsOTP, verifyOtp };
