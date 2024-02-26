"use strict";
const dns = require("dns").promises;
/**
 * A set of functions called "actions" for `rules-details`
 */

module.exports = {
  rules: async (ctx) => {
    const prdRules = await strapi.entityService.findMany(
      "api::production.production"
    );

    try {
      const resultados = await getRuleInfo(prdRules);
      // Assumindo que você queria ver os resultados diretamente
      // e também enviar como parte da resposta do Strapi.
      console.log(resultados);

      // Retornando os resultados através do contexto do Strapi
      ctx.send({
        data: resultados,
        message: "Dados processados com sucesso",
      });
    } catch (error) {
      console.error("Erro durante a execução:", error);
      ctx.send({
        error: "Erro ao processar os dados",
      });
    }
  },
};

async function getPlatform(domain) {
  try {
    const cname = await dns.resolveCname(domain);
    for (let register of cname) {
      if (register.includes("k8s")) {
        return { platform: "Openshift", cname: register };
      }
      return { platform: "Rancher", cname: register };
    }
  } catch (error) {
    console.error("Erro ao resolver CNAME para:", domain, error);
    return "Erro ao determinar a plataforma";
  }
}

async function getRuleInfo(prdRules) {
  // const domains = [
  //   {
  //     name: "radar.apps.bb.com.br",
  //     cname: "svc-outros.nuvem.dc.bb.com.br",
  //   },
  //   {
  //     name: "apps.bb.com.br",
  //     cname: "ingress-externo-k8sprdbb111.nuvem.bb.com.br",
  //   },
  // ];

  const resultados = [];
  for (let item of prdRules) {
    const app_url = item.rule["APW_APP_URL"];
    console.log(app_url, "rule console");
    const hostname = getHost(app_url);
    const platform = await getPlatform(hostname);
    const isSideCar = app_url.includes("appms");

    resultados.push({
      app_url: app_url,
      app_name: item.rule.APW_NAME,
      rule_name: item.Name,
      is_sidecar: isSideCar,
      platform: platform["platform"],
      cname: platform["cname"],
    });
  }
  return resultados;
}

function getHost(url) {
  // Extrai o host de uma URL
  console.log(url, "URL CONSOLE");
  const result = new URL(url);
  return result.hostname; // Usamos `hostname` para obter o host
}
