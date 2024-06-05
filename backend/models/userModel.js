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
    refereshToken:{type:String},
    adminType:{type:String,default:'Nil'},
    isMainAdmin:{type:Boolean,default:false},
    secret2FA:{type:String, default:'Nil'},
    otp:{type:String, default:'Nil'},
    otpExpire:{type:Date},
    role: {type:String, default:'user'}
  },
  { toJSON: { virtuals: true }}, {timestamps: true} 
);

userSchema.options.toJSON = {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
};
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = UserModel;
