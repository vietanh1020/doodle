import { Sequelize } from "sequelize";

const {
  DB_DATA = "doodle",
  DB_USER = "abc",
  DB_PASS = "p4ssword",
  DB_HOST = "mysql",
} = process.env;

export const sequelize = new Sequelize(DB_DATA, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect Database success");
  } catch (error) {
    console.error("Error connect Database", error);
  }
};

export default connectDB;
