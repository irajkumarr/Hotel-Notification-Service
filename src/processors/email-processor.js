const { Logger } = require("../config");
const { redisConnection } = require("../config/redis-config");
const {
  SEND_FORGOT_PASSWORD_EMAIL_PAYLOAD,
} = require("../producers/email-producer");
const { MAILER_QUEUE } = require("../queues/mailer-queue");
const { Worker } = require("bullmq");
const { EmailService } = require("../services");
const { renderMailTemplate } = require("../templates/templates-handler");

const setupMailerWorker = () => {
  // Worker to process mail-related jobs
  const mailProcessor = new Worker(
    MAILER_QUEUE,
    async (job) => {
      const payload = job.data;
      switch (job.name) {
        case SEND_FORGOT_PASSWORD_EMAIL_PAYLOAD:
          const emailContent = await renderMailTemplate(
            payload.templateId,
            payload.params
          );
          await EmailService.sendEmail(
            payload.to,
            payload.subject,
            emailContent
          );
          Logger.info(`📧 Forgot password email sent to ${payload.to}`);
          break;

        default:
          Logger.warn(`⚠️ Unknown job: ${job.name}`);
      } //process fn
    },
    { connection: redisConnection }
  );

  mailProcessor.on("failed", () => {
    console.error("Mail processing failed");
  });

  mailProcessor.on("completed", () => {
    console.log("Mail processing completed successfully");
  });
  Logger.info("👷 Worker listening for jobs...");
};

module.exports = {
  setupMailerWorker,
};
