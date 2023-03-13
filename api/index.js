const express = require("express");

const swaggerUi = require("swagger-ui-express");

const config = require("../config.js");
const auth = require("./components/auth/network");
const user = require("./components/user/network");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerDoc = require("./swagger.json");

// ROUTES

app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(config.api.port, () => {
  console.log("API escuchando en el puerto ", config.api.port);
});
