'use strict';
import { UserModel } from "./user.model.js";
import { RoleModel } from "./role.model.js";
import { ProjectsModel } from "./projects.model.js";
import RefreshToken from "./refreshToken.model.js";
import Sequelize from 'sequelize';


const sequelize = new Sequelize(
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
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize);
db.refreshToken = RefreshToken(sequelize, Sequelize);
db.project = ProjectsModel(sequelize, Sequelize)





// định danh quan hệ
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});


db.ROLES = ["user", "admin", "moderator"];

export default db;