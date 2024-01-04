"use strict";
// CUSTOM ROUTE USANDO POLICIES QUE PERMITE SOMENTE O ADMIN TENHA ACESSO
module.exports = [
  {
    method: "GET",
    path: "/pre-prod-rules/all",
    handler: "customController.getPreProdRules",
    config: {
      policies: ["isAdmin"],
    },
  },
];
