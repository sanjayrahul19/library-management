const swaggerJSDoc=require("swagger-jsdoc");
const swaggerAutogen= require("swagger-autogen")();

const securityDefinition = {
  type: 'apiKey',
  in: 'header',
  name: 'Authorization',
};

const swaggerOptions = {
  info: {
    title: 'Your API Name', 
    version: '1.0.0',
  },
  securityDefinitions: {
    jwt: securityDefinition, 
  },
  security: [
    {
      jwt: [],
    },
  ],
};
  const doc = {
    info: {
      title: "API Document for Library Management System",
      description: "This is just Crud operations in Library Management System",
    },
    host: "localhost:8000",
    schemes: ["http"],
  };
  const outputFile = "./swagger-output.json";

  const userRouter = ["../router/book-router/book-router.js"];
  
  swaggerAutogen(outputFile, userRouter, swaggerOptions);

  


