import { Sequelize } from "sequelize";

const {
  DB_DATA = "doodle",
  DB_USER = "abc",
  DB_PASS = "p4ssword",
  DB_HOST = "mysql",
} = process.env;

const sequelize = new Sequelize(DB_DATA, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối đến DB thành công");
  } catch (error) {
    console.error("Lỗi kết nối DB", error);
  }
};

export default connectDB;
