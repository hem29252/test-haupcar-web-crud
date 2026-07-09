const { Sequelize } = require("sequelize");
const sequelizeConfig = require("./sequelize-config");

const getDatabaseConfig = () => {
  if (process.env.NODE_ENV === "test") {
    return sequelizeConfig.test;
  }
  if (process.env.NODE_ENV === "production") {
    return sequelizeConfig.production;
  }

  return sequelizeConfig.development;
};

const databaseConfig = getDatabaseConfig();

exports.sequelize = new Sequelize({
  dialect: "postgres",
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
});
