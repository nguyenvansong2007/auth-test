import { STRING } from "sequelize";

const db = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "1",
  DB: "auth_test",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export default db;