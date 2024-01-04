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
};
