import express = require("express");
import example from "./api/example";

export default class Api {
  constructor() {
    const app = express();
    app.get("/example", example);
    app.listen(8001);
  }
}
