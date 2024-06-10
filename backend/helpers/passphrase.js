const { Fido2Lib } = require('fido2-lib');
const UserModel = require('../models/userModel');
const base64url = require('base64url');

// Initialize Fido2Lib
const fido2 = new Fido2Lib({
  timeout: 60000,
  rpId: process.env.PASSKEY_RP_ID,
  rpName: process.env.APP_NAME,
  challengeSize: 32,
  authenticatorRequireResidentKey: false,
  authenticatorUserVerification: 'preferred',
});

// Helper function to convert ArrayBuffer to base64url
// function arrayBufferToBase64url(buffer) {
//   return base64url(new Uint8Array(buffer));
// }

function arrayBufferToBase64url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64url.encode(binary);
}

async function passPhraseHandler(email, username) {
  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return 'User not found';
    }

    const userId = user._id.toString(); // Ensure userId is a string
    const registrationOptions = await fido2.attestationOptions();

    registrationOptions.user = {
      id: arrayBufferToBase64url(Buffer.from(userId)),
      name: email,
      displayName: username,
    };

    registrationOptions.challenge = arrayBufferToBase64url(
      registrationOptions.challenge
    );

    user.passphraseChallenge = registrationOptions.challenge;
    user.username = username;
    await user.save();

    return registrationOptions;
  } catch (error) {
    console.error(error);
    return 'An error occurred';
  }
}

module.exports = passPhraseHandler;
