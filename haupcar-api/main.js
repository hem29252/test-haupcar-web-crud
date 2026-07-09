require("dotenv").config();
const path = require("path");
global.rootRequire = (name) => require(path.join(__dirname, name));

const express = require("express");
const app = express();
const cors = require("cors");

const { httpErrorMiddleware } = require("./middlewares/http-error.middleware");
const { HttpError } = require("./config/http-error");

const { carController } = require("./api/v1/car/car.controller");

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
    code: 200,
  });
});

app.use("/api/v1", carController);

app.use(httpErrorMiddleware);

app.listen(3000, () => {
  console.log("Server is running http//:localhost:3000");
});
