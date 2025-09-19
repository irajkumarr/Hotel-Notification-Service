require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  REDIS_URL: process.env.REDIS_URL,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
};
