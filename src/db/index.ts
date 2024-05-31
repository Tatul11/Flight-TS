import { Sequelize } from "sequelize";

const sequelize = new Sequelize("user", "root", process.env.MYSQL_PASS, {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
  port: 3306,
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected successfully");
  } catch (error) {
    console.log(`Unable yo connect to the database`, error);
  }
};

start();
const Flight = require("../models/flight.model")(sequelize);

module.exports = {
  sequelize,
  flight: Flight,
};
