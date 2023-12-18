"use strict";

module.exports = async ({ strapi }) => {
  const actions = [
    {
      section: "plugins",
      displayName: "Read",
      uid: "read",
      pluginName: "plug-bb",
    },
  ];

  await strapi.admin.services.permission.actionProvider.registerMany(actions);
  // bootstrap phase
};
