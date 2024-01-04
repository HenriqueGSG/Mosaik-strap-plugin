import { useFetchClient } from "@strapi/helper-plugin";
import axios from "axios";
const BASE_URL_PRODUCTIONS = "http://localhost:1337/api/productions/";
const BASE_URL_TEMPS = "http://localhost:1337/api/temps/";
// export const fetchRulesIdsAndNamesTest = async () => {
//   const url = `http://localhost:1337/api/temps?populate=*`;
//   try {
//     const response = await axios.get(
//       "http://localhost:1337/api/temps?publicationState=preview&populate=*"
//     );

//     console.log(response, "REPONSE EXTERNAL");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

const token = sessionStorage.getItem("jwtToken").replace(/"/g, "");
console.log(token);

// CHAMAR DE FORMA INTERNA O ENDPOIINT
export const useRulesIdsAndNames = () => {
  const fetchClient = useFetchClient();

  const fetchRulesIdsAndNames = async () => {
    try {
      const response = await fetchClient.get("/plug-bb/pre-prod-rules/all");
      return response; // Ou processar os dados conforme necessário
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      throw error; // ou tratar o erro de outra maneira
    }
  };

  return fetchRulesIdsAndNames;
};
export const fetchRulesIdsAndNames = async () => {
  try {
    const response = await axios.get(
      "http://localhost:1337/plug-bb/pre-prod-rules/all",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const responseTest = await axios.get(
      "http://localhost:1337/api/temps?publicationState=preview&populate=*"
    );

    console.log(response.data, "###");
    console.log(responseTest.data, "test");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteAfterUpdate = async (statsFromUpdate, preProdRule) => {
  console.log(statsFromUpdate.status, "hereee");
  if (statsFromUpdate.status >= 200 && statsFromUpdate.status < 300) {
    try {
      console.log("HERE 2");

      const delResp = await axios.delete(
        `${BASE_URL_TEMPS}${preProdRule["id"]}`
      );

      if (delResp.status >= 200 && delResp.status < 300) {
        console.log("DELETE bem-sucedido");
        return delResp;
      } else {
        // A solicitação DELETE falhou
        console.error(
          "Falha ao executar DELETE:",
          delResp.status,
          delResp.statusText
        );
      }
    } catch (error) {
      // Lidar com erros na solicitação DELETE
      console.error("Erro na solicitação DELETE:", error.message);
    }
  } else {
    // A solicitação PUT falhou
    console.error(
      "Falha ao executar PUT:",
      statsFromUpdate.status,
      statsFromUpdate.statusText
    );
  }
};

export const updateRule = async (preProdRule, prodRule) => {
  console.log(preProdRule, "preProdRule UPDATE SECTION");
  console.log(prodRule, "prodRule UPDATE SECTION");
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const idRule = prodRule["id"];
    prodRule["rule"] = preProdRule["rule"];
    console.log(prodRule);
    const response = await axios.put(
      `${BASE_URL_PRODUCTIONS}${idRule}`,
      { data: prodRule },
      {
        headers,
      }
    );
    // deleteAfterUpdate(response, preProdRule);
    // window.location.href = `http://localhost:1337/admin/content-manager/collectionType/api::production.production/${prodRule["id"]}`;
  } catch (error) {
    console.error("Error updating rule:", error);
  }
};
