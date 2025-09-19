const { transporter } = require("../config/mailer-config");
const { Logger } = require("../config");
const { AppError } = require("../utils");

async function sendEmail(to, subject, body) {
  try {
    await transporter.sendMail({
      from: serverConfig.MAIL_USER,
      to,
      subject,
      html: body,
    });
    Logger.info(`Email sent to ${to} with subject "${subject}"`);
  } catch (error) {
    throw new AppError(`Failed to send email`);
  }
}

module.exports = {
  sendEmail,
};
