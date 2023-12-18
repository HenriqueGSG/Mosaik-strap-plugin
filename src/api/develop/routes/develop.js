'use strict';

/**
 * develop router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::develop.develop');
