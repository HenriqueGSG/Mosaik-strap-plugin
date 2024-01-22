module.exports = [
  // {
  //   name: "strapi::security",
  //   config: {
  //     contentSecurityPolicy: false,
  //   },
  // },
  // {
  //   name: "strapi::security",
  //   config: {
  //     contentSecurityPolicy: {
  //       useDefaults: true,
  //       directives: {
  //         "connect-src": ["'self'", "http://localhost:3000"], // Adicione seu servidor NestJS aqui
  //         // outras diretivas CSP conforme necessário
  //       },
  //     },
  //   },
  // },
  "strapi::security",
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
