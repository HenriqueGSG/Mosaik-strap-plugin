const fs = require("fs");
const logFilePath = "change-log.json";

module.exports = {
  //   async beforeDelete(event) {
  //     const itemId = event.params.where.id;
  //     // Encontrar registros na outra collection onde 'temp' é igual ao itemId
  //     // @ts-ignore
  //     const registrosRelacionados = await strapi.entityService.findMany(
  //       "api::production.production",
  //       {
  //         filters: { temp: itemId },
  //         populate: ["temp"],
  //       }
  //     );
  //     console.log(registrosRelacionados);
  //     updateProdAndLog(
  //       registrosRelacionados[0]["temp"],
  //       registrosRelacionados[0]
  //     );
  //   },
  // };
  // function updateProdAndLog(preProdRule, prodRule) {
  //   // Encontrar a regra correspondente em 'prod' com base na relação com 'temp'
  //   // Ler o arquivo de log existente ou iniciar uma lista vazia
  //   console.log(preProdRule["rule"], "PRE PROD RULE");
  //   console.log(prodRule["rule"], "PROD RULE");
  //   let logs = [];
  //   if (fs.existsSync(logFilePath)) {
  //     logs = JSON.parse(fs.readFileSync(logFilePath, "utf-8"));
  //   }
  //   let logEntry = logs.find((log) => log.id === prodRule["id"]);
  //   if (logEntry) {
  //     logEntry.oldRules.push(prodRule["rule"]);
  //     logEntry.currentRule = preProdRule["rule"];
  //   } else {
  //     logEntry = {
  //       id: prodRule["id"],
  //       currentRule: preProdRule["rule"],
  //       oldRules: [prodRule["rule"]],
  //     };
  //     logs.push(logEntry);
  //   }
  //   // Adicionar o estado atual da regra 'prod' ao log
  //   // Atualizar a regra 'prod' e deletar a regra 'temp'
  //   // sua lógica de atualização
  //   // Salvar o log atualizado
  //   console.log(logs);
  //   fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
};
