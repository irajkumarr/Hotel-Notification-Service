const nodemailer = require("nodemailer");
const serverConfig = require("./server-config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: serverConfig.MAIL_USER,
    pass: serverConfig.MAIL_PASS,
  },
});

module.exports = {
  transporter,
};
