import { Sequelize } from "sequelize";

export const config_db = new Sequelize(
  'auth_test',// host
  'postgres',// user
  '123', // Password
  {
    DB: 'localhost',  // db name
    dialect: 'postgres', // database dialect
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


