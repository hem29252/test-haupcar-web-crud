const { Op } = require("sequelize");

const { Car } = require("../../../models/car.model");
const { HttpError } = require("../../../config/http-error");
const { API_STATUS } = require("../../../constants/api-status");

const createCar = async (body) => {
  const { registration_number, model, notes, brand } = body;

  if (!registration_number) {
    throw new HttpError(
      API_STATUS.BAD_REQUEST.CODE,
      API_STATUS.BAD_REQUEST.MESSAGE,
    );
  }

  if (!model) {
    throw new HttpError(
      API_STATUS.BAD_REQUEST.CODE,
      API_STATUS.BAD_REQUEST.MESSAGE,
    );
  }

  if (!brand) {
    throw new HttpError(
      API_STATUS.BAD_REQUEST.CODE,
      API_STATUS.BAD_REQUEST.MESSAGE,
    );
  }

  const car = await Car.create({
    registration_number,
    model,
    notes,
    brand,
  });

  return car;
};

const getCars = async (query) => {
  const { page = 1, limit = 10 } = query;
  const offset = page * limit - limit;

  let where = {};

  if (query.search) {
    where = {
      [Op.or]: [
        {
          registration_number: {
            [Op.like]: `%${query.search}%`,
          },
        },
        {
          brand: {
            [Op.like]: `%${query.search}%`,
          },
        },
        {
          model: {
            [Op.like]: `%${query.search}%`,
          },
        },
      ],
    };
  }

  if (query.startDate && query.endDate) {
    where.created_at = {
      [Op.between]: [`${query.startDate} 00:00`, `${query.endDate} 23:59`],
    };
  }

  const findCars = await Car.findAndCountAll({
    attributes: [
      "id",
      "registration_number",
      "brand",
      "model",
      "notes",
      "created_at",
      "updated_at",
    ],
    offset: offset,
    limit: limit,
    order: [["created_at", "DESC"]],
    where: where,
  });

  const rows = findCars.rows || [];
  const totalRaws = findCars.count || 0;
  const next = totalRaws > page * limit;
  const prev = page > 1;
  const totalPage = Math.ceil(totalRaws / limit);

  return {
    rows: rows,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalPage: totalPage,
      totalRaws: totalRaws,
      prev: prev,
      next: next,
    },
  };
};

const getCarById = async (carId) => {
  if (!carId) {
    throw new HttpError(
      API_STATUS.BAD_REQUEST.CODE,
      API_STATUS.BAD_REQUEST.MESSAGE,
    );
  }

  const car = await Car.findOne({
    attributes: [
      "id",
      "registration_number",
      "brand",
      "model",
      "notes",
      "created_at",
      "updated_at",
    ],
    where: {
      id: carId,
    },
  });

  if (!car) {
    throw new HttpError(
      API_STATUS.NOT_FOUND.CODE,
      API_STATUS.NOT_FOUND.MESSAGE,
    );
  }

  return car;
};

const updateCarById = async (carId, body) => {
  if (!carId) {
    throw new HttpError(
      API_STATUS.BAD_REQUEST.CODE,
      API_STATUS.BAD_REQUEST.MESSAGE,
    );
  }

  const car = await Car.findByPk(carId);
  if (!car) {
    throw new HttpError(
      API_STATUS.NOT_FOUND.CODE,
      API_STATUS.NOT_FOUND.MESSAGE,
    );
  }

  const { registration_number, name, model, notes, brand } = body;
  if (!registration_number) {
    throw new HttpError(
      API_STATUS.BAD_REQUEST.CODE,
      API_STATUS.BAD_REQUEST.MESSAGE,
    );
  }

  if (!model) {
    throw new HttpError(
      API_STATUS.BAD_REQUEST.CODE,
      API_STATUS.BAD_REQUEST.MESSAGE,
    );
  }

  if (!brand) {
    throw new HttpError(
      API_STATUS.BAD_REQUEST.CODE,
      API_STATUS.BAD_REQUEST.MESSAGE,
    );
  }

  const carToUpdate = await Car.update(
    {
      registration_number,
      name,
      model,
      brand,
      notes,
    },
    {
      where: {
        id: carId,
      },
    },
  );

  return carToUpdate;
};

const partialUpdateCarById = async (carId, body) => {
  if (!carId) {
    throw new HttpError(
      API_STATUS.BAD_REQUEST.CODE,
      API_STATUS.BAD_REQUEST.MESSAGE,
    );
  }

  const car = Car.findByPk(carId);

  if (!car) {
    throw new HttpError(
      API_STATUS.NOT_FOUND.CODE,
      API_STATUS.NOT_FOUND.MESSAGE,
    );
  }

  const carToUpdate = await Car.update(
    { ...car, ...body },
    {
      where: {
        id: carId,
      },
    },
  );

  return carToUpdate;
};

const removeCarById = async (carId) => {
  if (!carId) {
    throw new HttpError(
      API_STATUS.BAD_REQUEST.CODE,
      API_STATUS.BAD_REQUEST.MESSAGE,
    );
  }

  const car = Car.findByPk(carId);

  if (!car) {
    throw new HttpError(
      API_STATUS.NOT_FOUND.CODE,
      API_STATUS.NOT_FOUND.MESSAGE,
    );
  }

  await Car.destroy({
    where: {
      id: carId,
    },
  });
};

exports.carService = {
  createCar,
  getCars,
  getCarById,
  partialUpdateCarById,
  removeCarById,
  updateCarById,
};
