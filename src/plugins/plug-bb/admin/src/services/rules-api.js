import { request } from "@strapi/helper-plugin";
import axios from "axios";
const BASE_URL = "http://localhost:1337/api/productions/";

export const fetchRulesIdsAndNames = async () => {
  try {
    const response = await axios.get("http://localhost:1337/api/productions", {
      params: {
        "fields[0]": "id",
        "fields[1]": "Name",
      },
    });

    console.log(response.data["data"]);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchRulesWithTemps = async (idRule) => {
  try {
    const response = await axios.get(`${BASE_URL}${idRule}?populate=temps`);
    return response.data["data"];
  } catch (error) {
    console.error("Erro ao buscar dados da coleção:", error.message);
  }
};
