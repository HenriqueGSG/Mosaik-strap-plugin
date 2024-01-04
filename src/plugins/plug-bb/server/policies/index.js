"use strict";

const isAdmin = require("./is-admin");

module.exports = {
  isAdmin,
  // superAdmin: async (policyContext, config, { strapi }) => {
  //   if (policyContext.state.user.role.name === "Administrator") {
  //     // Go to next policy or will reach the controller's action.
  //     return true;
  //   }

  //   return false;
  // },
  // const user = ctx.state.user;

  // if (!user) {
  //   return ctx.unauthorized("Não logado");
  // }

  // if (user.role.name !== "Super Admin") {
  //   return ctx.unauthorized("Acesso restrito a super-administradores");
  // }

  // await next();
};
