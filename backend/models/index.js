'use strict';
import db_config from "../config/db.config.js";
import Sequelize from "sequelize";
import {UserModel} from "../models/user.model.js";
import {RoleModel} from "../models/role.model.js";

const sequelize = new Sequelize(
  db_config.DB,
  db_config.USER,
  db_config.PASSWORD,
  {
    host: db_config.HOST,
    dialect: db_config.dialect,
    pool: {
      max: db_config.pool.max,
      min: db_config.pool.min,
      acquire: db_config.pool.acquire,
      idle: db_config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];

export default db;