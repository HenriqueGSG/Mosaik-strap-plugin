// PERMITINDO SOMENTE ADMINS
module.exports = (policyContext, config, { strapi }) => {
  console.log("here");
  console.log(policyContext.state.user.roles[0].name);
  console.log(policyContext.state.user.isAdmin);
  if ((policyContext.state.user.roles[0].name = "Super Admin")) {
    return true;
  }

  return false; // Ou você pode usar `return policyContext.unauthorized('Sua mensagem de erro aqui');`
};
