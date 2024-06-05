const nodemailer = require('nodemailer')
const sendEmail = async (email, subject, messageBody) => {
  //create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email provider (e.g., 'hotmail', 'yahoo')
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  });
  //   Construct a message for transport
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: messageBody,
  };
  //   Send mail.

  return await transporter.sendMail(message);
};

module.exports = sendEmail