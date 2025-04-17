'use strict';
import Sequelize from 'sequelize';
import { UserModel } from "./user.model.js";
import { RoleModel } from "./role.model.js";
import { ProjectsModel } from "./projects.model.js";
import RefreshToken from "./refreshToken.model.js";
import { ProjectRoleModel } from "./projectRole.model.js";
import { FileModel } from "./file.model.js"


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
db.projectRole = ProjectRoleModel(sequelize, Sequelize)
db.file = FileModel(sequelize, Sequelize)



// định danh quan hệ
// role 
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

//user
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});


// refresh token 
db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
});



// One-to-Many: User -> Project
db.user.hasMany(db.project, { foreignKey: "createdBy" });
db.project.belongsTo(db.user, { foreignKey: "createdBy", as: "userId" });


// Many-to-Many: User <-> Project through ProjectMembers
db.user.belongsToMany(db.project, {
  through: db.projectRole, foreignKey: "userId", otherKey: "projectId",
});

db.project.belongsToMany(db.user, {
  through: db.projectRole, foreignKey: "projectId", otherKey: "userId",
});

db.ROLES = ["user", "admin", "moderator"];

export default db;