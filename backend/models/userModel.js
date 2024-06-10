const mongoose = require('mongoose');

const { Schema } = mongoose;

const webauthnCredentialSchema = new Schema({
  fmt: String,
  alg: {
    algName: String,
    hashAlg: String,
  },
  x5c: String,
  sig: String, // base64url encoded
  rawAuthnrData: String, // base64url encoded
  transports: [String],
  rpIdHash: String, // base64url encoded
  flags: [String],
  counter: Number,
  aaguid: String, // base64url encoded
  credIdLen: Number,
  credId: String, // base64url encoded
  credentialPublicKeyCose: String, // base64url encoded
  credentialPublicKeyJwk: {
    kty: String,
    alg: String,
    n: String,
    e: String,
  },
  credentialPublicKeyPem: String,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Nil' },
    firstName: { type: String, default: 'Nil' },
    lastName: { type: String, default: 'Nil' },
    token: { type: String },
    profileImg: { type: String },
    username: { type: String, default: 'Nil' },

    email: { type: String, required: true },
    password: { type: String, default: 'Nil' },

    signInMethod: { type: String, default: 'SIGNUP' },
    refereshToken: { type: String },
    adminType: { type: String, default: 'Nil' },
    isAdmin: { type: Boolean, default: false },
    isMainAdmin: { type: Boolean, default: false },
    secret2FA: { type: String, default: 'Nil' },
    otp: { type: String, default: 'Nil' },
    otpExpire: { type: Date },
    role: { type: String, default: 'user' },
    authEnabled: [{ type: String }],
    passphraseChallenge: { type: String },
    webauthnCredentials: [
      {
        fmt: String,
        publicKey: String,
        credId: String,
        counter: Number,
        transports: [String],
        clientDataJSON: String,
      },
    ],
    passPhrase: { type: String },
    phoneNumber: { type: String },
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

userSchema.options.toJSON = {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
};
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = UserModel;
