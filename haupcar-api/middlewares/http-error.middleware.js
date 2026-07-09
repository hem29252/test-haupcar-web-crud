const { HttpError } = require("../config/http-error");
const { API_STATUS } = require("../constants/api-status");

exports.httpErrorMiddleware = (error, req, res, next) => {
  console.log("ERROR[httpErrorMiddleware]:", error);
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });

    return;
  }

  res.status(API_STATUS.INTERNAL_SERVER_ERROR.CODE).json({
    statusCode: API_STATUS.INTERNAL_SERVER_ERROR.CODE,
    message: API_STATUS.INTERNAL_SERVER_ERROR.MESSAGE,
  });
};
