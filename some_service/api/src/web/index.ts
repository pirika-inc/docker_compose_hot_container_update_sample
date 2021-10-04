import express = require("express");
import * as openapi from "express-openapi";
import * as swaggerUi from "swagger-ui-express";
import apiDoc = require("./doc.json");
import { OpenAPIV3 } from "openapi-types";

export default class Api {
  constructor(app: express.Express) {
    openapi.initialize({
      app,
      apiDoc: {
        ...apiDoc,
        "x-express-openapi-validation-strict": true,
      } as OpenAPIV3.Document,
      paths: `${__dirname}/api`,
      docsPath: "/schema",
      consumesMiddleware: {
        "application/json": express.json(),
      },
      errorMiddleware: (err, req, res) => {
        res.status(500);
        res.json(err);
      },
      exposeApiDocs: true,
    });

    app.use("/", swaggerUi.serve);
    app.get(
      "/",
      swaggerUi.setup(
        {},
        {
          swaggerOptions: {
            url: "/schema",
          },
          explorer: true,
        }
      )
    );
    app.listen(8000);
  }
}
