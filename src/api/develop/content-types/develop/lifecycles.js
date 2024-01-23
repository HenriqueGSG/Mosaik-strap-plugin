const createLogger = require("../../../../services/logger");
const path = require("path");
const { checkLogFileExists } = require("./utils");
const fs = require("fs").promises;

// require("../../../../../logs/combined.log");

module.exports = {
  async beforeUpdate(event) {
    // VERIFICAR SE USUARIO ESTA AUTENTICADO
    const logFileName = event.params.data["Name"];
    const isFile = await checkLogFileExists(logFileName, "develop");
    console.log(event);
    if (!isFile) {
      const idRule = event.params.data["id"];
      const entry = await strapi.entityService.findOne(
        "api::develop.develop",
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
      const logger = createLogger(logFileName, "develop");
      logger.info("Item de Develop atualizado", { object: logFormat });
    }
  },
  async afterUpdate(event) {
    // VERIFICAR SE USUARIO ESTA AUTENTICADO
    const idRule = event.params.data["id"];

    const entry = await strapi.entityService.findOne(
      "api::develop.develop",
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

    const logger = createLogger(logFileName, "develop");
    logger.info("Regra de Develop atualizado", { object: logFormat });
  },
};
