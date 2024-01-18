const logger = require("../services/logger");

module.exports = ({ strapi }) => ({
  async getPreProdRules(ctx) {
    const funciName = ctx.state.user.firstname + " " + ctx.state.user.lastname;
    try {
      logger.info("Iniciando getPreProdRules" + funciName);
      const data = await strapi.entityService.findMany("api::temp.temp", {
        publicationState: "preview",
        populate: "*",
      });
      logger.info("Dados antigos antes da atualização:", {
        object: { rule: data[0]["rule"] },
      });
      ctx.send(data);
      logger.info("Finalizando getPreProdRules com sucesso");
    } catch (err) {
      logger.error("Erro em getPreProdRules: " + err.message);
      ctx.throw(500, "Erro interno do servidor");
    }
  },
  async updateProdRules(ctx) {
    const { id } = ctx.request.body;
    const funciName = ctx.state.user.firstname + " " + ctx.state.user.lastname;
    try {
      logger.info("Iniciando updateProdRules " + funciName);
      const temp = await strapi.entityService.findOne("api::temp.temp", id, {
        populate: { production: true },
      });
      console.log(temp, "################");
      if (temp && temp.production) {
        await strapi.entityService.update(
          "api::production.production",
          temp.production.id,
          {
            data: {
              Name: temp.name,
              // copie outros campos conforme necessário
            },
          }
        );

        // Delete a entrada 'temp' após a atualização
        await strapi.entityService.delete("api::temp.temp", id);
        ctx.send({ message: "Temp entry updated and deleted immediately" });
        logger.info(
          "Atualização de production realizada com sucesso " + funciName
        );
      } else {
        ctx.send({
          message:
            "No associated production entry found or temp entry does not exist.",
        });
      }
    } catch (err) {
      ctx.throw(500, "Erro interno do servidor");
    }
  },
});
// DENFINIR A LOGICA PARA CADA ROTA
