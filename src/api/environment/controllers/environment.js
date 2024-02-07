"use strict";

module.exports = {
  async find(ctx) {
    return ctx.send({
      envVar: process.env.PORT, // Substitua MY_ENV_VAR pela sua variável de ambiente específica
    });
  },
};
