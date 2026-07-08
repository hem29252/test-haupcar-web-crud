require("dotenv").config();

const express = require("express");
const app = express();

const { carController } = require("./api/v1/car/car.controller");

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "OK",
  });
});

app.use("/api/v1", [carController]);

app.listen(3000, () => {
  console.log("Server on http//:localhost:3000");
});
