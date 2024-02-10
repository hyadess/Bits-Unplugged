require("dotenv").config();

("use strict");
const nodemailer = require("nodemailer");
const sendMail = async (to, subject, text) => {
  console.log(
    to,
    text,
    subject,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  );
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  var mailOptions = {
    from: "registration@bitsunplugged.onrender.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendMail;
