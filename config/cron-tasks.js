module.exports = {
  // Executa a cada hora para verificar entradas agendadas
  "0 * * * *": async () => {
    const now = new Date();
    const scheduledTemps = await strapi.entityService.findMany(
      "api::temp.temp",
      {
        filters: {
          scheduler: now,
        },
        populate: {
          production: true,
        },
      }
    );

    for (const temp of scheduledTemps) {
      try {
        if (temp.production) {
          // Realiza a atualização na collection 'production'
          await strapi.entityService.update(
            "api::production.production",
            temp.production.id,
            {
              data: {
                Name: temp.name,
                // Outros campos conforme necessário
              },
            }
          );

          // Exclui a entrada em 'temp'
          await strapi.entityService.delete("api::temp.temp", temp.id);
        }
      } catch (error) {
        strapi.log.error("Erro ao processar a entrada agendada:", error);
      }
    }
  },
};
