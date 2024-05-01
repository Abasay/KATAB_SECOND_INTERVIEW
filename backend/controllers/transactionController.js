const Transaction = require('../models/TransactionModel.js');
const CashbackandMilesPoints = require('../models/Rewards&Cashbacks.js');
const handleTransportIdCardGenerate = require('../middlewares/transportIdPDFFile.js');

/**
 * Uploads a transaction for the user and updates rewards.
 * Route: POST /api/v1/transactions/upload
 * Access: Private
 * Body:
 * {
 *   "transactionId": "string",
 *   "journey": "string",
 *   "milesTravelled": "number",
 *   "journeyDuration": "string",
 *   "tfare": "number",
 *   "trans": "string"
 * }
 */ const transactionUpload = async (req, res) => {
  try {
    const {
      transactionId,
      journey,
      milesTravelled,
      journeyDuration,
      tfare,
      trans,
    } = req.body;

    const user = req.user;

    // Generate transport PDF URL
    const pdfTransactionUrl = await handleTransportIdCardGenerate(
      'Thanks for patronizing us!!!',
      'PASS_' + trans,
      transactionId
    );

    // Ensure PDF URL is obtained before proceeding
    // if (!pdfTransactionUrl) {
    //   return res.status(500).json({
    //     success: false,
    //     data: {
    //       message: 'Failed to generate transport PDF URL.',
    //     },
    //   });
    // }

    // Create or update user transaction
    let userTransaction = await Transaction.findOne({ userId: user._id });
    if (!userTransaction) {
      userTransaction = await Transaction.create({
        userId: user._id,
        transactions: [
          {
            transactionId,
            journey,
            milesTravelled,
            journeyDuration,
            tfare,
            transportId: 'PASS_' + trans,
            transportPDFUrl: pdfTransactionUrl,
          },
        ],
      });
    } else {
      userTransaction.transactions.push({
        transactionId,
        journey,
        milesTravelled,
        journeyDuration,
        tfare,
        transportId: 'PASS_' + trans,
        transportPDFUrl: pdfTransactionUrl,
      });
      await userTransaction.save();
    }

    // Create or update user rewards
    let userRewards = await CashbackandMilesPoints.findOne({
      userId: user._id,
    });
    if (!userRewards) {
      userRewards = await CashbackandMilesPoints.create({
        userId: user._id,
        cashbacksandmilespoints: [
          {
            transportId: 'PASS_' + trans,
            journey,
            milesTravelled,
            cashback: parseFloat(parseFloat(tfare) * 0.005),
            milesPoints: parseFloat(parseFloat(milesTravelled) * 0.005),
            tfare,
          },
        ],
      });
    } else {
      userRewards.cashbacksandmilespoints.push({
        transportId: 'PASS_' + trans,
        journey,
        milesTravelled,
        cashback: parseFloat(parseFloat(tfare) * 0.005),
        milesPoints: parseFloat(parseFloat(milesTravelled) * 0.005),
        tfare,
      });
      await userRewards.save();
    }

    // Return success response
    return res.status(200).json({
      success: true,
      data: {
        message: 'Transaction uploaded successfully',
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: {
        message: 'An error occurred while uploading transaction.',
      },
    });
  }
};

/**
 * Retrieves transaction history for the user.
 * Route: GET /api/v1/transactions/history
 * Access: Private
 */

const transactionHistory = async (req, res) => {
  try {
    const user = req.user;

    const userTransaction = await Transaction.findOne({ userId: user._id });
    if (!userTransaction) {
      return res.status(404).json({
        success: false,
        data: {
          message: 'No transaction history found for user',
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        message: 'Transaction history fetched successfully',
        transactions: userTransaction.transactions,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: {
        message: 'An error occurred while fetching transaction history.',
      },
    });
  }
};

/**
 * Retrieves cashbacks history for the user.
 * Route: GET /api/v1/cashbacks/history
 * Access: Private
 */
const cashbacks = async (req, res) => {
  try {
    const user = req.user;

    const userCashbacks = await CashbackandMilesPoints.findOne({
      userId: user._id,
    });
    if (!userCashbacks) {
      return res.status(404).json({
        success: false,
        data: {
          message: 'No Cashbacks history found for user',
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        message: 'Cashbacks history fetched successfully',
        cashbacksHistory: userCashbacks.cashbacksandmilespoints,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: {
        message: 'An error occurred while fetching cashbacks history.',
      },
    });
  }
};

module.exports = { transactionUpload, transactionHistory, cashbacks };
