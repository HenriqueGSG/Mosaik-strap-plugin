/**
 *
 * PluginIcon
 *
 */

import React from "react";
import {
  Box,
  Flex,
  FieldLabel,
  FieldInput,
  JSONInput,
  Typography,
  Link,
} from "@strapi/design-system";

const RuleDisplay = ({ rule, title, link, isProd }) => (
  <Box paddingTop={5}>
    <Flex direction="column" display="inline" gap={4}>
      <FieldLabel>
        <Typography variant={"beta"}>{title}</Typography>
        {link && (
          <Box paddingLeft={2}>
            <Link href={link} isExternal />
          </Box>
        )}
      </FieldLabel>
      <FieldInput
        disabled
        value={isProd ? rule["Name"] : rule["name"]}
        type="text"
      />
      <Typography variant="epsilon">{rule["description"]}</Typography>
      <JSONInput
        paddingTop={4}
        disabled
        value={JSON.stringify(rule["rule"], null, 2)}
        style={{ maxHeight: "600px" }}
      />
    </Flex>
  </Box>
);

const RuleDetails = ({ prodRule, preProdRules }) => {
  console.log(prodRule, `RULE DETAILS`);
  console.log(preProdRules);
  return (
    <>
      <Box paddingTop={5} gap={10}>
        <RuleDisplay rule={prodRule} title="Regra PROD" isProd={true} />
        <RuleDisplay
          rule={preProdRules}
          title="Regra PRÉ-PROD"
          link={preProdRules["issueLink"]}
        />
      </Box>
    </>
  );
};

export default RuleDetails;
