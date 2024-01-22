const createLogger = require("../../../../services/logger");
const path = require("path");
const fs = require("fs");
// require("../../../../../logs/combined.log");
module.exports = {
  async beforeCreate(event) {},

  async beforeUpdate(event) {
    // VERIFICAR SE USUARIO ESTA AUTENTICADO
    const logFileName = event.params.data["Name"];
    const filePath = path.resolve(__dirname, "../logs", logFileName + ".log");
    console.log(filePath);
    console.log(fs.existsSync(filePath));
    if (fs.existsSync(filePath)) {
      console.log("LOG ALREADY EXIST");
    } else {
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
      console.log(logFormat);
      console.log("-------------BEFORE--------");
      const logger = createLogger(logFileName);
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
    // console.log(entry);
    const logFileName = event.params.data["Name"];
    console.log("-------------AFTER--------");

    const logger = createLogger(logFileName);
    logger.info("Item de Production atualizado", { object: logFormat });
  },
};
