module.exports = {
  // DENFINIR A LOGICA PARA CADA ROTA
  async getPreProdRules(ctx) {
    try {
      const data = await strapi.entityService.findMany("api::temp.temp", {
        publicationState: "preview",
        populate: "*",
      });
      console.log(data);
      ctx.send(data);
    } catch (err) {
      ctx.throw(500, "Erro interno do servidor");
    }
  },
  async updateProdRules(ctx) {
    const { id, scheduler } = ctx.request.body;

    try {
      if (scheduler) {
        // Se uma data de agendamento for fornecida, apenas atualize o campo scheduler
        // fluxo diferente para scheduler
        const updatedTemp = await strapi.entityService.update(
          "api::temp.temp",
          id,
          {
            data: {
              scheduler,
            },
          }
        );
        ctx.send({
          message: "Temp entry scheduled successfully",
          data: updatedTemp,
        });
      } else {
        // Se nenhuma data for fornecida, execute a operação de atualização e exclusão imediatamente

        // fluxo padrao ja utilizado
        const temp = await strapi.entityService.findOne("api::temp.temp", id, {
          populate: { production: true },
        });

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
      }
    } catch (err) {
      ctx.throw(500, "Erro interno do servidor");
    }
  },
};
