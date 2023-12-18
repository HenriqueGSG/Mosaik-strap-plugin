/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import {
  BaseHeaderLayout,
  Box,
  ContentLayout,
  Dialog,
  Flex,
  Layout,
} from "@strapi/design-system";
import axios from "axios";
import SelectField from "../../components/SelectField";
import ProdModal from "../../components/ProdModal";
import {
  fetchRulesIdsAndNames,
  fetchRulesWithTemps,
} from "../../services/rules-api";
import RuleDetails from "../../components/RuleDetails";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import DialogUpdate from "../../components/DialogUpdate";

const BASE_URL = "http://localhost:1337/api/productions/";

const HomePage = () => {
  const [prodRule, setProdRule] = useState(null);
  const [preProdRules, setPreProdRules] = useState(null);
  const [selectedRule, setSelectedRule] = useState(null);
  const [productions, setProductions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRulesIdsAndNames();
        setProductions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchData = async (idRule) => {
    try {
      const responseData = await fetchRulesWithTemps(idRule);
      if (responseData["attributes"]["temps"]["data"].length === 0) {
        setPreProdRules(null);
        setProdRule(null);
        return;
      }
      const tempRules = responseData["attributes"]["temps"]["data"];
      const lastTempRule = tempRules.length - 1;

      const { id, attributes } = responseData;
      const { Name, rule } = attributes;

      setProdRule({ id, Name, rule });
      setPreProdRules(
        responseData["attributes"]["temps"]["data"][lastTempRule]
      );
    } catch (error) {
      console.error("Error fetching rules with temps:", error);
    }
  };

  const updateRule = async (preProdRuleV, prodRuleV) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const idRule = prodRuleV["id"];

      prodRuleV["rule"] = preProdRuleV["attributes"]["rule"];
      const response = await axios.put(
        `${BASE_URL}${idRule}`,
        { data: prodRuleV },
        {
          headers,
        }
      );
      const responseData = response.data;
      const { id, attributes } = responseData["data"];
      const { Name, rule } = attributes;
      setProdRule({ id, Name, rule });
    } catch (error) {
      console.error("Error updating rule:", error);
    }
  };

  const handleUpdateRule = () => {
    updateRule(preProdRules, prodRule);
  };

  const handleSelectChange = (value) => {
    setSelectedRule(value);
    fetchData(value);
  };

  // if (isLoading) return <LoadingIndicatorPage />;

  return (
    <Layout>
      <BaseHeaderLayout
        title="Mosaik Rules Plugin"
        subtitle="Alteração de regra em PROD"
        as="h2"
      />

      <ContentLayout>
        {!prodRule && !preProdRules ? (
          <Box
            padding={[11, 6, 1]}
            background="white"
            shadow="filterShadow"
            hiddenXS
            borderColor="danger600"
            borderStyle="line"
            borderWidth="2px"
            gap
          >
            <SelectField
              selectFieldData={productions}
              handleSelectChange={handleSelectChange}
              selectedRule={selectedRule}
            ></SelectField>
          </Box>
        ) : (
          <>
            <Box
              padding={[8, 6, 1]}
              background="white"
              shadow="filterShadow"
              hiddenXS
              borderColor="danger600"
              borderStyle="line"
              borderWidth="2px"
              gap={4}
            >
              <SelectField
                selectFieldData={productions}
                handleSelectChange={handleSelectChange}
                selectedRule={selectedRule}
              ></SelectField>
              <RuleDetails prodRule={prodRule} preProdRules={preProdRules} />

              <Flex direction="row" gap={2} paddingTop={2}>
                <DialogUpdate
                  handleUpdateRule={handleUpdateRule}
                  preProdRule={preProdRules}
                  prodRulesId={prodRule["id"]}
                ></DialogUpdate>

                <ProdModal
                  handleUpdateRule={handleUpdateRule}
                  preProdRule={preProdRules}
                  prodRulesId={prodRule["id"]}
                ></ProdModal>
              </Flex>
              {/* <Button onClick={() => handleUpdateRule()}>Atualizar regra</Button> */}
            </Box>
          </>
        )}
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
