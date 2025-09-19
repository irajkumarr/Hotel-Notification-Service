const { transporter } = require("../config/mailer-config");
const { Logger, ServerConfig } = require("../config");
const { AppError } = require("../utils");
const { StatusCodes } = require("http-status-codes");

async function sendEmail(to, subject, body) {
  try {
    await transporter.sendMail({
      from: ServerConfig.MAIL_USER,
      to,
      subject,
      html: body,
    });
    Logger.info(`Email sent to ${to} with subject "${subject}"`);
  } catch (error) {
    throw new AppError(
      `Failed to send email`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  sendEmail,
};
