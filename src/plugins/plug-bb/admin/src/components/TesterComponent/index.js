import { Box } from "@strapi/design-system";
import React from "react";

const TesterComponent = ({ propText }) => {
  return (
    <div>
      <h1 data-testid={"textTest"}>Tester Comp</h1>
      <span data-testid={"propTextId"}>{propText}</span>
      <Box padding={4}>
        <h2 data-testid={"insideBox"}>Inside Box</h2>
      </Box>
    </div>
  );
};

export default TesterComponent;
