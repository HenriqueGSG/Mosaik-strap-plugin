import React, { useState } from "react";
import {
  Badge,
  Box,
  Flex,
  SingleSelect,
  SingleSelectOption,
} from "@strapi/design-system";
const SelectField = ({ handleSelectChange, selectedRule, selectFieldData }) => {
  console.log(selectFieldData, "SELECT FIELD DATA");
  // ALTERAR AQUI
  const renderSelectOptions = () => {
    return selectFieldData?.map((item) => (
      <SingleSelectOption key={item["id"]} value={JSON.stringify(item)}>
        {item["name"]}
      </SingleSelectOption>
    ));
  };

  return (
    <Flex direction="column" alignItems="stretch" gap={5}>
      <SingleSelect
        label="Regras em produção"
        required
        placeholder="Selecione a regra em prod"
        // hint="Regras em produção"
        onChange={handleSelectChange}
        value={selectedRule}
      >
        {renderSelectOptions()}
      </SingleSelect>
      {selectedRule && (
        <Box>
          <Badge size="M" active={true}>
            {selectedRule}
          </Badge>
        </Box>
      )}
    </Flex>
  );
};
export default SelectField;
