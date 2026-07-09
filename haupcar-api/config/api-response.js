const { API_STATUS } = require("../constants/api-status");

exports.apiResponse = (
  statusCode = API_STATUS.OK.CODE,
  message = API_STATUS.OK.MESSAGE,
  data,
) => {
  if (!data) {
    return {
      statusCode,
      message,
    };
  }

  return {
    statusCode,
    message,
    data,
  };
};
