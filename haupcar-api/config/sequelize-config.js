require("dotenv").config();

const development = {
  username: process.env.PG_USER,
  password: `${process.env.PG_PASSWORD}`,
  database: process.env.PG_DATABASE_NAME,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: "postgres",
};
const test = {
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE_NAME,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: "postgres",
};
const production = {
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE_NAME,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: "postgres",
};

module.exports = {
  development,
  test,
  production,
};
