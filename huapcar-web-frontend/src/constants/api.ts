export const API_ENDPOINTS = {
  CARS: "/cars",
  CAR: "/car",
  CAR_CAR_ID: (carId: string) => `/car/${carId}`,
};

export const API_STATUS = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
