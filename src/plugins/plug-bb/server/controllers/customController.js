module.exports = ({ strapi }) => ({
  async getPreProdRules(ctx) {
    try {
      const data = await strapi.entityService.findMany("api::temp.temp", {
        publicationState: "preview",
        populate: "*",
      });
      ctx.send(data);
    } catch (err) {
      ctx.throw(500, "Erro interno do servidor");
    }
  },
  async updateProdRules(ctx) {
    const { id, scheduler } = ctx.request.body;

    try {
      // Se nenhuma data for fornecida, execute a operação de atualização e exclusão imediatamente

      // fluxo padrao ja utilizado
      const temp = await strapi.entityService.findOne("api::temp.temp", id, {
        populate: { production: true },
      });
      console.log(temp, "################");
      if (temp && temp.production) {
        // Atualize a entrada correspondente em 'production'
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
