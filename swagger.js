// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "SwiftMove Logistics API",
    version: "1.0.0",
    description: "API Documentation for the SwiftMove Logistics application",
    contact: {
      name: "Krys",
      email: "contact@swiftmove.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
};

// Options for Swagger JSDoc
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Function to set up Swagger UI
const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
