const createLogger = require("../../../../services/logger");
const path = require("path");
const fs = require("fs").promises;
// require("../../../../../logs/combined.log");

async function checkFileExists(folderPath, fileName) {
  try {
    const filePath = path.join(__dirname, "../../../../logs/production/");
    console.log(filePath);
    await fs.access(filePath); // Apenas chame fs.access com o caminho do arquivo
    console.log(`O arquivo ${fileName} existe.`);
    return true;
  } catch (err) {
    console.error(`O arquivo ${fileName} não existe.`);
    return false;
  }
}

module.exports = {
  async beforeUpdate(event) {
    // VERIFICAR SE USUARIO ESTA AUTENTICADO
    const logFileName = event.params.data["Name"];
    const logFolderPath = "../../../../../logs/production";
    const isFile = await checkFileExists(logFolderPath, logFileName);
    if (!isFile) {
      const idRule = event.params.data["id"];
      const entry = await strapi.entityService.findOne(
        "api::production.production",
        idRule,
        {
          populate: "*",
        }
      );
      const logFormat = {
        rule: entry["rule"],
        createdBy: `${entry["createdBy"]["firstname"]} ${entry["createdBy"]["lastname"]}`,
      };
      console.log("-------------BEFORE--------");
      // console.log(logFormat);
      console.log("-------------BEFORE--------");
      const logger = createLogger(logFileName, "production");
      logger.info("Item de Production atualizado", { object: logFormat });
    }
  },
  async afterUpdate(event) {
    // VERIFICAR SE USUARIO ESTA AUTENTICADO
    const idRule = event.params.data["id"];

    const entry = await strapi.entityService.findOne(
      "api::production.production",
      idRule,
      {
        populate: "*",
      }
    );
    const logFormat = {
      rule: entry["rule"],
      updatedBy: `${entry["updatedBy"]["firstname"]} ${entry["updatedBy"]["lastname"]}`,
    };
    console.log("-------------AFTER--------");
    // console.log(event);
    // console.log(entry);
    const logFileName = event.params.data["Name"];
    console.log("-------------AFTER--------");

    const logger = createLogger(logFileName, "production");
    logger.info("Item de Production atualizado", { object: logFormat });
  },
};
