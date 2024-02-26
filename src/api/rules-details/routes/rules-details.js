module.exports = {
  routes: [
    {
      method: "GET",
      path: "/rules-details",
      handler: "rules-details.rules",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
