const mongoose = require('mongoose');

const CashbacksandMilesPointSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    cashbacksandmilespoints: [
      {
        transportId: {
          type: String,
          required: true,
        },
        journey: {
          type: String,
        },

        milesTravelled: {
          type: Number,
        },
        cashback: {
          type: Number,
        },
        milesPoints: {
          type: Number,
        },

        tfare: {
          type: Number,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  { timestamps: true }
);

const CashbackandMilesPoints =
  mongoose.model.CashbacksandMilesPoint ||
  mongoose.model('CashbacksandMilesPoint', CashbacksandMilesPointSchema);

module.exports = CashbackandMilesPoints;
