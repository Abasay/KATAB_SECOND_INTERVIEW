const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Nil' },
    firstName: { type: String, default: 'Nil' },
    lastName: { type: String, default: 'Nil' },
    token: { type: String },
    profileImg: { type: String },

    email: { type: String, required: true },
    password: { type: String, default: 'Nil' },

    signInMethod: { type: String, default: 'SIGNUP' },
    isAdmin: { type: Boolean, default: false },
  },
  { toJSON: { virtuals: true } }
);

userSchema.options.toJSON = {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
};
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = UserModel;
