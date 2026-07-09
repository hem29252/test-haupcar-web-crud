import { apiV1 } from "../config/api";
import httpClient from "../config/http-client";
import { API_ENDPOINTS } from "../constants/api";
import type { ICarCreateRequest, ICarPaginationRequest } from "../types/car";

const getCars = (params: ICarPaginationRequest) => {
  return httpClient.get(apiV1(API_ENDPOINTS.CARS), {
    params,
  });
};

const postCar = (payload: ICarCreateRequest) => {
  return httpClient.post(apiV1(API_ENDPOINTS.CAR), payload);
};

const deleteCarByCarId = (carId: string) => {
  return httpClient.delete(apiV1(API_ENDPOINTS.CAR_CAR_ID(carId)));
};

const getCarByCarId = (carId: string) => {
  return httpClient.get(apiV1(API_ENDPOINTS.CAR_CAR_ID(carId)));
};

const putCarById = (carId: string, payload: ICarCreateRequest) => {
  return httpClient.put(apiV1(API_ENDPOINTS.CAR_CAR_ID(carId)), payload);
};

export const carService = {
  getCars,
  postCar,
  deleteCarByCarId,
  getCarByCarId,
  putCarById,
};
