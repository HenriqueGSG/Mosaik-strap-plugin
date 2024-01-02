import axios from "axios";

const BASE_URL_PRODUCTIONS = "http://localhost:1337/api/productions/";
const BASE_URL_TEMPS = "http://localhost:1337/api/temps/";
export const fetchRulesIdsAndNames = async () => {
  const url = `http://localhost:1337/api/temps?populate=*`;
  try {
    const response = await axios.get(
      "http://localhost:1337/api/temps?publicationState=preview&populate=*"
    );

    console.log(response.data["data"]);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchRulesWithTemps = async (idRule) => {
  try {
    const response = await axios.get(
      `${BASE_URL_PRODUCTIONS}${idRule}?populate=temps`
    );
    return response.data["data"];
  } catch (error) {
    console.error("Erro ao buscar dados da coleção:", error.message);
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
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const idRule = prodRule["id"];
    prodRule["rule"] = preProdRule["attributes"]["rule"];
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
