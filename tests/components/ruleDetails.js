/** @jest-environment jsdom */

// AQUI EU MOCO OS COMPONENTES DO STRAPI
jest.mock("@strapi/design-system", () => {
  return {
    __esModule: true,
    Box: ({ children }) => <div>{children}</div>, // Mock para o Box
    // Adicione mocks para outros componentes do @strapi/design-system, se necessário
  };
});

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
// PARA LIDAR COM TEST NO DOM
import "@testing-library/jest-dom";
import React from "react";

import RuleDetails from "../../src/plugins/plug-bb/admin/src/components/RuleDetails";
import TesterComponent from "../../src/plugins/plug-bb/admin/src/components/TesterComponent";
afterEach(() => {
  cleanup();
});

describe("RuleDetails Component", () => {
  test("Tester Component", () => {
    render(<TesterComponent propText={"PropText"} />);
    const element = screen.getByTestId("textTest");
    const propTextEl = screen.getByTestId("propTextId");
    const boxTextEl = screen.getByTestId("insideBox");
    console.log(element);

    expect(propTextEl).toBeInTheDocument();
    expect(propTextEl).toHaveTextContent("PropText");

    expect(boxTextEl).toBeInTheDocument();
    expect(boxTextEl).toHaveTextContent("Inside Box");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("Tester Comp");
  });
});
