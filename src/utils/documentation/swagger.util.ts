const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");
const theme = new SwaggerTheme();
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Airline management API Documentation",
      version: "0.1.0",
      description:
        "This is airline manageement   CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Thinh Ha",
        email: "haphuthinh332004@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./src/routes/**/*.ts", "./src/dto/**/*.ts"],
};

const specs = swaggerJsdoc(options);
export function swaggerInit(app: any, root_api: any, port: any) {
  //Swagger init
  app.use(
    `${root_api}/api-docs`,
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: theme.getBuffer(SwaggerThemeNameEnum.FLATTOP),
    })
  );
  console.log(
    `Swagger is running on http://localhost:${port}${root_api}/api-docs`
  );
}
