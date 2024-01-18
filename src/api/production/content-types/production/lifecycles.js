const createLogger = require("../../../../services/logger");

module.exports = {
  async beforeCreate(event) {},
  async afterUpdate(event) {
    // VERIFICAR SE USUARIO ESTA AUTENTICADO
    const user = event.context.state.user;
    console.log(user, "useeeeer");
    const logFileName = event.params.data["Name"];

    const logger = createLogger(logFileName);
    logger.info("Item de Production atualizado", { object: event.params.data });
  },
  // Outros Lifecycle Hooks...
};
