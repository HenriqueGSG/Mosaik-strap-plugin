import React from "react";
import { Button } from "@strapi/design-system";
import { Upload } from "@strapi/icons";

const RefreshCache = () => {
  const handleClick = async () => {
    //  Política de Segurança de Conteúdo (CSP) //
    // await fetch(
    //   "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome"
    // ).then((data) => console.log(data["dados"]));
    // await fetch("http://localhost:3000/users").then((data) =>
    //   console.log(data)
    // );
    await fetch(
      "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome"
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data["dados"]));
  };

  return (
    <Button
      variant="secondary"
      startIcon={<Upload />}
      onClick={() => handleClick()}
    >
      Hello World
    </Button>
  );
};

export default RefreshCache;
