/** @jest-environment jsdom */
// AQUI EU MOCO OS COMPONENTES DO STRAPI
jest.mock("@strapi/design-system", () => {
  return {
    __esModule: true,
    ...jest.requireActual("@strapi/design-system"), // Mantém as outras exportações originais
    Box: ({ children }) => <div>{children}</div>,
    Flex: ({ children }) => <div>{children}</div>,
    SingleSelect: ({ children, label, onChange, value }) => (
      <select aria-label={label} onChange={onChange} value={value}>
        {children}
      </select>
    ),
    SingleSelectOption: ({ children, value }) => (
      <option value={value}>{children}</option>
    ),
    Badge: ({ children, active, size }) => (
      <span>
        {children} {active ? "active" : ""} {size}
      </span>
    ),
    // Adicione mocks para outros componentes, se necessário
  };
});

import { render, screen, cleanup, fireEvent } from "@testing-library/react";
// PARA LIDAR COM TEST NO DOM
import "@testing-library/jest-dom";
import React from "react";
// } = require("../../src/plugins/plug-bb/admin/src/components/SelectField");
import SelectField from "../../src/plugins/plug-bb/admin/src/components/SelectField";
// afterEach(() => {
//   cleanup();
// });
test(`Component Text`, () => {
  const handleSelectChangeMock = jest.fn();

  // Dados fictícios para passar como prop 'selectFieldData'

  const selectFieldData = [
    { id: "1", name: "Opção 1", production: true },
    { id: "2", name: "Opção 2", production: false },
    // Adicione mais opções conforme necessário
  ];

  render(
    <SelectField
      handleSelectChange={handleSelectChangeMock}
      selectFieldData={selectFieldData}
      selectedRule={1}
    />
  );

  // Verifica se as opções são renderizadas

  selectFieldData.forEach((option) => {
    console.log(option);
    expect(screen.getByText(option.name)).toBeInTheDocument();
  });

  const selectFieldLabel = screen.getByLabelText("Regras em produção");
  expect(selectFieldLabel).toBeInTheDocument();

  // Simula a seleção de uma opção
  fireEvent.change(screen.getByLabelText("Regras em produção"), {
    target: { value: JSON.stringify(selectFieldData[0]) },
  });

  // Verifica se a função handleSelectChange foi chamada
  // expect(handleSelectChangeMock).toHaveBeenCalledWith(
  //   JSON.stringify(selectFieldData[0])
  // );
  // expect(true).to
  //   expect(true).toBe(true);
});
