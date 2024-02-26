"use strict";
const axios = require("axios");
const dns = require("dns").promises;
const fs = require("fs").promises;

module.exports = {
  async find(ctx) {
    try {
      const resultados = await fetchDataAndSave();
      // Assumindo que você queria ver os resultados diretamente
      // e também enviar como parte da resposta do Strapi.
      console.log(resultados);

      // Retornando os resultados através do contexto do Strapi
      ctx.send({
        resultados: resultados,
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
      console.log(register);
      if (register.includes("k8s")) {
        return "Openshift";
      }
    }
    return "Rancher";
  } catch (error) {
    console.error("Erro ao resolver CNAME para:", domain, error);
    return "Erro ao determinar a plataforma";
  }
}

async function fetchDataAndSave() {
  const domains = [
    {
      name: "radar.apps.bb.com.br",
      cname: "svc-outros.nuvem.dc.bb.com.br",
    },
    {
      name: "apps.bb.com.br",
      cname: "ingress-externo-k8sprdbb111.nuvem.bb.com.br",
    },
  ];

  const resultados = [];
  for (let item of domains) {
    const platform = await getPlatform(item.name);
    resultados.push({ ...item, platform });
  }
  return resultados;
}

// async function fetchDataAndSave() {
//   const domains = [
//     {
//       name: "radar.apps.bb.com.br",
//       cname: "k8s-service1.cloudprovider.com",
//     },
//     { name: "apps.bb.com.br", cname: "svc-outros.nuvem.dc.bb.com.br" },
//   ];
//   try {
//     // Fazendo a requisição para obter a lista de objetos
//     // const response = await axios.get(url);
//     // const listaDeObjetos = response.data; // Assumindo que a resposta é a lista de objetos

//     // Iterando sobre a lista de objetos para processar cada um
//     const resultados = [];
//     for (let item of domains) {
//       // Aqui você extrai as informações necessárias de cada item
//       // Por exemplo, assumindo que cada item tenha um 'domain'
//       const platform = await getPlatform(item.name);
//       resultados.push({ ...item, platform });
//     }

//     // Salvando os resultados em um arquivo JSON
//     // await fs.writeFile('resultados.json', JSON.stringify(resultados, null, 2));
//     // console.log('Os dados foram salvos com sucesso em resultados.json');
//     console.log(resultados);
//   } catch (error) {
//     console.error("Erro ao buscar dados ou salvar o arquivo:", error);
//   }
// }
