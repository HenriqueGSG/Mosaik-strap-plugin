/*
 *
 * HomePage
 *
 */

import React, { useEffect } from "react";
import {
  BaseHeaderLayout,
  Box,
  ContentLayout,
  Flex,
  Layout,
} from "@strapi/design-system";
import SelectField from "../../components/SelectField";
import RuleDetails from "../../components/RuleDetails";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import DialogUpdate from "../../components/DialogUpdate";
import useRuleManagement from "../../hooks/useRuleManagement";

const HomePage = () => {
  const {
    prodRule,
    preProdRules,
    selectedRule,
    productions,
    isLoading,
    fetchData,
    handleUpdateRule,
    handleSelectChange,
  } = useRuleManagement();

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <LoadingIndicatorPage />;

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
                ></DialogUpdate>
              </Flex>
            </Box>
          </>
        )}
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
