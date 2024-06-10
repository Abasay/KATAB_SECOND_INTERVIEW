const { Fido2Lib } = require('fido2-lib');
const UserModel = require('../models/userModel');
const fido2 = new Fido2Lib();
const base64url = require('base64url');

let userDb = {}; // This should be replaced with your actual user database

async function verifyPassPhraseHandler(email, attestationResponse) {
  if (!email || !attestationResponse) {
    return 'Invalid request';
  }
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return 'User not found';
  }

  const userId = user._id.toString();

  function base64urlToArrayBuffer(base64urlString) {
    return Uint8Array.from(base64url.toBuffer(base64urlString)).buffer;
  }
  // function base64urlToArrayBuffer(base64urlString) {
  //   const binaryString = base64url.decode(base64urlString);
  //   const length = binaryString.length;
  //   const bytes = new Uint8Array(length);
  //   for (let i = 0; i < length; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   return bytes.buffer;
  // }

  function arrayBufferToBase64url(buffer) {
    return base64url(new Uint8Array(buffer));
  }
  // function arrayBufferToBase64url(buffer) {
  //   const bytes = new Uint8Array(buffer);
  //   let binary = '';
  //   for (let i = 0; i < bytes.byteLength; i++) {
  //     binary += String.fromCharCode(bytes[i]);
  //   }
  //   return base64url.encode(binary);
  // }

  if (!user || !user.passphraseChallenge) {
    return 'User not found or invalid challenge';
  }
  // Convert base64url strings back to ArrayBuffer
  attestationResponse.rawId = base64urlToArrayBuffer(attestationResponse.rawId);
  attestationResponse.response.clientDataJSON = base64urlToArrayBuffer(
    attestationResponse.response.clientDataJSON
  );
  attestationResponse.response.attestationObject = base64urlToArrayBuffer(
    attestationResponse.response.attestationObject
  );

  const attestationExpectations = {
    challenge: user.passphraseChallenge,
    origin: 'https://candm-services.vercel.app',
    factor: 'either',
  };

  try {
    const attestationResult = await fido2.attestationResult(
      attestationResponse,
      attestationExpectations
    );
    console.log(attestationResult);

    const cred = {
      fmt: attestationResult.fmt,
      publicKey: attestationResult.authnrData.get('credentialPublicKeyPem'),
      credId: arrayBufferToBase64url(
        attestationResult.authnrData.get('credId')
      ),
      counter: attestationResult.authnrData.get('counter'),
      transports: attestationResult.authnrData.get('transports'),
      clientDataJSON: arrayBufferToBase64url(
        attestationResponse.response.clientDataJSON
      ),
    };

    console.log(cred);

    user.webauthnCredentials.push(cred);
    await user.save();
    // userDb[userId].authenticator = attestationResult.authnrData;
    // delete userDb[userId].challenge;

    return { status: 'ok' };
  } catch (error) {
    console.error(error);
    console.log(error);
    return 'An error occurred';
    // res.status(400).json({ status: 'failed', error });
  }
}

async function verifyPassPhraseLoginHandler(email, assertionResponse) {
  if (!email || !assertionResponse) {
    return 'Invalid request';
  }
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return 'User not found';
  }

  const userId = user._id.toString();

  // function base64urlToArrayBuffer(base64urlString) {
  //   const binaryString = base64url.decode(base64urlString);
  //   const length = binaryString.length;
  //   const bytes = new Uint8Array(length);
  //   for (let i = 0; i < length; i++) {
  //     bytes[i] = binaryString.charCodeAt(i);
  //   }
  //   return bytes.buffer;
  // }

  function base64urlToArrayBuffer(base64urlString) {
    return Uint8Array.from(base64url.toBuffer(base64urlString)).buffer;
  }
  function arrayBufferToBase64url(buffer) {
    return base64url(new Uint8Array(buffer));
  }

  if (!user || !user.passphraseChallenge) {
    return 'User not found or invalid challenge';
  }
  // Convert base64url strings back to ArrayBuffer
  assertionResponse.rawId = base64urlToArrayBuffer(assertionResponse.rawId);
  assertionResponse.response.clientDataJSON = base64urlToArrayBuffer(
    assertionResponse.response.clientDataJSON
  );
  assertionResponse.response.authenticatorData = base64urlToArrayBuffer(
    assertionResponse.response.authenticatorData
  );
  assertionResponse.response.signature = base64urlToArrayBuffer(
    assertionResponse.response.signature
  );
  assertionResponse.response.userHandle = base64urlToArrayBuffer(
    assertionResponse.response.userHandle
  );

  // const clientDataHash = crypto
  //   .createHash('sha256')
  //   .update(clientDataJSON)
  //   .digest();
  // const signedData = Buffer.concat([
  //   new Uint8Array(authenticatorData),
  //   clientDataHash,
  // ]);

  const publicKey = user.webauthnCredentials[0].publicKey; // This should be a PEM encoded public key

  // const isSignatureValid = crypto
  //   .createVerify('SHA256')
  //   .update(signedData)
  //   .verify(publicKey, signature);

  // console.log(isSignatureValid);

  // if (!isSignatureValid) {
  //   return { status: 'failed', error: 'Invalid signature' };
  // }
  const assertionExpectations = {
    challenge: user.passphraseChallenge,
    origin: 'http://localhost:3000',
    factor: 'either',
    userHandle: arrayBufferToBase64url(Buffer.from(user._id.toString())), // Assuming userHandle is the user ID
    prevCounter: user.webauthnCredentials[0].counter,
    publicKey: user.webauthnCredentials[0].publicKey,
  };

  try {
    const attestationResult = await fido2.assertionResult(
      assertionResponse,
      assertionExpectations
    );
    console.log(attestationResult);

    // userDb[userId].authenticator = attestationResult.authnrData;
    // delete userDb[userId].challenge;

    return { status: 'ok' };
  } catch (error) {
    console.error(error);
    console.log(error);
    return 'An error occurred';
    // res.status(400).json({ status: 'failed', error });
  }
}
module.exports = { verifyPassPhraseHandler, verifyPassPhraseLoginHandler };
