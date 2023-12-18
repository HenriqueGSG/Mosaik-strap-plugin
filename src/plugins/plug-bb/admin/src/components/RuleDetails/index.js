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
  Avatar,
  Initials,
} from "@strapi/design-system";

const RuleDetails = ({ prodRule, preProdRules }) => {
  return (
    <>
      <Box paddingTop={8} gap={10}>
        <Box>
          <Flex direction="column" display="inline">
            <FieldLabel>
              <Typography>Regra PROD</Typography>
            </FieldLabel>
            <FieldInput
              padding={4}
              disabled
              value={prodRule["Name"]}
              type="text"
            />
            <JSONInput
              paddingTop={4}
              disabled
              value={JSON.stringify(prodRule["rule"], null, 2)}
              style={{ maxHeight: "600px" }}
            ></JSONInput>
          </Flex>
        </Box>
        <Box paddingTop={8}>
          <Flex direction="column" display="inline" gap={4}>
            <Box paddingTop={4}>
              <FieldLabel>
                <Typography variant={"beta"}>Regra PROD TEMP</Typography>
                <Box paddingLeft={2}>
                  <Link
                    href={preProdRules["attributes"]["issueLink"]}
                    isExternal
                  >
                    #{preProdRules["attributes"]["issueNumber"]}
                  </Link>
                </Box>
              </FieldLabel>
            </Box>
            <Box paddingTop={1}>
              <FieldInput
                disabled
                value={preProdRules["attributes"]["name"]}
                type="text"
              />

              {/* <Initials>MF</Initials> */}

              <Typography variant={"epsilon"}>
                {preProdRules["attributes"]["description"]}
              </Typography>
            </Box>
            <JSONInput
              paddingTop={4}
              value={JSON.stringify(
                preProdRules["attributes"]["rule"],
                null,
                2
              )}
              style={{ maxHeight: "600px" }}
              disabled
            ></JSONInput>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default RuleDetails;
