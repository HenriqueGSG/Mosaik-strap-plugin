const fs = require("fs");
const logFilePath = "change-log.json";

module.exports = {
  async beforeUpdate(event) {
    const itemId = event.params.where.id;
    const ruleData = event.params.data;
    // Encontrar registros na outra collection onde 'temp' é igual ao itemId
    // @ts-ignore
    console.log(event.params.data);
    // console.log(event);
    // @ts-ignore
    // const registrosRelacionados = await strapi.entityService.findMany(
    //   "api::production.production",
    //   {
    //     filters: { temp: itemId },
    //     populate: ["temp"],
    //   }
    // );

    // console.log(registrosRelacionados);
    updateProdAndLog(ruleData);
  },
};

function updateProdAndLog(ruleData) {
  // Encontrar a regra correspondente em 'prod' com base na relação com 'temp'

  // Ler o arquivo de log existente ou iniciar uma lista vazia
  console.log(ruleData["rule"], "PRE PROD RULE");
  console.log(ruleData["attributes"]["rule"], "PROD RULE");
  let logs = [];
  if (fs.existsSync(logFilePath)) {
    logs = JSON.parse(fs.readFileSync(logFilePath, "utf-8"));
  }
  let logEntry = logs.find((log) => log.id === ruleData["id"]);
  if (logEntry) {
    logEntry.oldRules.unshift(ruleData["attributes"]["rule"]);
    logEntry.currentRule = ruleData["rule"];
  } else {
    logEntry = {
      id: ruleData["id"],
      currentRule: ruleData["rule"],
      oldRules: [ruleData["attributes"]["rule"]],
    };
    logs.push(logEntry);
  }
  // Adicionar o estado atual da regra 'prod' ao log

  // Atualizar a regra 'prod' e deletar a regra 'temp'
  // sua lógica de atualização

  // Salvar o log atualizado
  console.log(logs);
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
}
