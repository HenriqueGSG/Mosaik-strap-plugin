'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('plug-bb')
      .service('myService')
      .getWelcomeMessage();
  },
});
