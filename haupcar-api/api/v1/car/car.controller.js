const express = require("express");
const router = express.Router();

const { carService } = require("./car.service");
const { API_STATUS } = require("../../../constants/api-status");
const { apiResponse } = require("../../../config/api-response");

router.post("/car", async (req, res, next) => {
  try {
    await carService.createCar(req.body);

    res
      .status(API_STATUS.SUCCESS.CODE)
      .json(apiResponse(API_STATUS.SUCCESS.CODE, API_STATUS.SUCCESS.MESSAGE));
  } catch (error) {
    next(error);
  }
});

router.get("/cars", async (req, res, next) => {
  try {
    const cars = await carService.getCars(req.query);

    res
      .status(API_STATUS.SUCCESS.CODE)
      .json(
        apiResponse(API_STATUS.SUCCESS.CODE, API_STATUS.SUCCESS.MESSAGE, cars),
      );
  } catch (error) {
    next(error);
  }
});

router.get("/car/:carId", async (req, res, next) => {
  try {
    const { carId } = req.params;
    const car = await carService.getCarById(carId);

    res
      .status(API_STATUS.SUCCESS.CODE)
      .json(
        apiResponse(API_STATUS.SUCCESS.CODE, API_STATUS.SUCCESS.MESSAGE, car),
      );
  } catch (error) {
    next(error);
  }
});

router.patch("/car/:carId", async (req, res, next) => {
  try {
    await carService.partialUpdateCarById(req.params.carId, req.body);

    res
      .status(API_STATUS.SUCCESS.CODE)
      .json(apiResponse(API_STATUS.SUCCESS.CODE, API_STATUS.SUCCESS.MESSAGE));
  } catch (error) {
    next(error);
  }
});

router.put("/car/:carId", async (req, res, next) => {
  try {
    await carService.updateCarById(req.params.carId, req.body);

    res
      .status(API_STATUS.SUCCESS.CODE)
      .json(apiResponse(API_STATUS.SUCCESS.CODE, API_STATUS.SUCCESS.MESSAGE));
  } catch (error) {
    next(error);
  }
});

router.delete("/car/:carId", async (req, res, next) => {
  try {
    await carService.removeCarById(req.params.carId);

    res
      .status(API_STATUS.SUCCESS.CODE)
      .json(apiResponse(API_STATUS.SUCCESS.CODE, API_STATUS.SUCCESS.MESSAGE));
  } catch (error) {
    next(error);
  }
});

exports.carController = router;
