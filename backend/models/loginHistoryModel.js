const mongoose = require('mongoose');

const LoginHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId },
    loginHistories: [
      {
        latitude: { type: String },
        longitude: { type: String },
        date: { type: Date, default: Date.now },
        location: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const LoginHistoryModel =
  mongoose.model.LoginHistory ||
  mongoose.model('LoginHistory', LoginHistorySchema);

module.exports = LoginHistoryModel;
