import React, { useState } from "react";
import {
  Badge,
  Box,
  Flex,
  SingleSelect,
  SingleSelectOption,
} from "@strapi/design-system";
const SelectField = ({ handleSelectChange, selectedRule, selectFieldData }) => {
  //   const [selectedValue, setSelectedValue] = useState(null);
  const [error, toggleError] = useState();
  const [disabled, toggleDisabled] = useState(false);

  //   const handleSelectChange = (value) => {
  //     setSelectedValue(value);
  //     console.log(selectedValue);
  //   };
  return (
    <Flex direction="column" alignItems="stretch" gap={5}>
      <SingleSelect
        label="Regras em produção"
        required
        placeholder="Selecione a regra em prod"
        // hint="Regras em produção"
        error={error}
        disabled={disabled}
        onChange={handleSelectChange}
        value={selectedRule ? selectedRule : "NO RULE SELECTED"}
      >
        {selectFieldData["data"]?.map((item) => {
          return (
            <SingleSelectOption key={item["id"]} value={JSON.stringify(item)}>
              {item["attributes"]["name"]}
            </SingleSelectOption>
          );
        })}
      </SingleSelect>
      {selectedRule && (
        <Box>
          <Badge size="M" active={true} children={selectedRule}></Badge>
        </Box>
      )}
    </Flex>
  );
};
export default SelectField;
