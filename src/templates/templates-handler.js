const fs = require("fs/promises");
const path = require("path");
const Handlebars = require("handlebars");
const { AppError } = require("../utils");
const { StatusCodes } = require("http-status-codes");

async function renderMailTemplate(templateId, params) {
  const templatePath = path.join(__dirname, "mailer", `${templateId}.hbs`);

  try {
    const content = await fs.readFile(templatePath, "utf-8");
    const finalTemplate = Handlebars.compile(content);
    return finalTemplate(params);
  } catch (error) {
    throw new AppError(
      `Template not found: ${templateId}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  renderMailTemplate,
};
