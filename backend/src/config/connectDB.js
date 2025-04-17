import { Sequelize } from "sequelize";


export const config_db = new Sequelize(
  "auth_test",
  "postgres",
  "123",
  {
    host: 'localhost',
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const connectDB = async () => {
  try {
    await config_db.authenticate();
    console.log('Connect has been established successfully.');
    return config_db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// export default { connectDB, config_db };


