const express = require("express");
const router = express.Router();

router.get("/cars", (req, res) => {
  res.status(200).json({
    message: "OK",
    code: 200,
    data: [],
  });
});

exports.carController = router;
