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
  Field,
} from "@strapi/design-system";

const RuleDisplay = ({ rule, title, link, isProd }) => (
  <Box paddingTop={4}>
    <Flex direction="column" display="inline" gap={4}>
      <Field name="rule" required={true}>
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
      </Field>
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
      <Box paddingTop={4} gap={10}>
        <RuleDisplay
          rule={prodRule}
          title="Regra PROD"
          isProd={true}
          link={undefined}
        />
        <RuleDisplay
          rule={preProdRules}
          title="Regra PRÉ-PROD"
          link={preProdRules["issueLink"]}
          isProd={undefined}
        />
      </Box>
    </>
  );
};

export default RuleDetails;
