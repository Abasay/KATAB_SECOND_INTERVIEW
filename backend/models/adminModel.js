const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Nil' },
    firstName: { type: String, default: 'Nil' },
    lastName: { type: String, default: 'Nil' },
    token: { type: String },
    profileImg: { type: String },

    email: { type: String, required: true },
    password: { type: String, default: 'Nil' },
    isAdmin: { type: Boolean, default: false },
    refereshToken: { type: String },
    adminType: { type: String, default: 'Nil' },
    isMainAdmin: { type: Boolean, default: false },
    secret2FA: { type: String, default: 'Nil' },
    otp: { type: String, default: 'Nil' },
    otpExpire: { type: Date },
    role: { type: String, default: 'Admin' },
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
  { toJSON: { virtuals: true } },
  { timestamps: true }
);

AdminSchema.options.toJSON = {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
};
const AdminModel =
  mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
module.exports = AdminModel;
