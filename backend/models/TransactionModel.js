const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    transactions: [
      {
        transactionId: {
          type: String,
          required: true,
        },
        journey: {
          type: String,
        },

        milesTravelled: {
          type: Number,
        },

        journeyDuration: {
          type: String,
        },
        tfare: {
          type: Number,
        },
        useableForTransport: {
          type: Boolean,
          default: true,
        },
        transportId: {
          type: String,
        },
        transportPDFUrl: {
          type: String,
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

const Transaction =
  mongoose.model.Transaction ||
  mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
