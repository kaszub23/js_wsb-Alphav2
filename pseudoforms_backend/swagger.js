const swaggerJSDoc = require(`swagger-jsdoc`);

const swaggerDefinition = {
openapi: `3.0.0`,
info: {
title: `API PseudoForms`,
version: `1.0.0`,
description: `PseudoForms API - Opis, którego nie ma, i być nie będzie`,
},
tags: [
    {
      name: "Ankiety",
      description: "Wszystko związane z Ankietami",
    },
    {
      name: "Użytkownicy",
      description: "Wszystko związane z Użytkownikami",
    }
  ]
};

const options = {
swaggerDefinition,
apis: ['./routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;