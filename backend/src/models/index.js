'use strict';
import Sequelize from 'sequelize';
import { UserModel } from "./user.model.js";
import { RoleModel } from "./role.model.js";
import { ProjectsModel } from "./projects.model.js";
import RefreshToken from "./refreshToken.model.js";
import { ProjectRoleModel } from "./projectRole.model.js";
import { FileModel } from "./file.model.js"
import { CompanyModel } from "./company.model.js"

const sequelize = new Sequelize(
  //  process.env.DB_HOST,
  "auth_test",
  "postgres",
  "123",
  // process.env.DB_PASSWORD,
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
db.company = CompanyModel(sequelize, Sequelize)


// định danh quan hệ
// role - user
db.role.belongsToMany(db.user, { through: "user_roles", foreignKey: "roleId", otherKey: "userId" });
db.user.belongsToMany(db.role, { through: "user_roles", foreignKey: "userId", otherKey: "roleId" });

// refresh token  - user
db.user.hasOne(db.refreshToken, { foreignKey: 'userId', targetKey: 'id' });
db.refreshToken.belongsTo(db.user, { foreignKey: 'userId', targetKey: 'id' });

// One-to-Many: User -> Project
db.user.hasMany(db.project, { foreignKey: "createdBy" });
db.project.belongsTo(db.user, { foreignKey: "createdBy", as: "creator" });
// User - Member Projects (dự án user tham gia qua bảng trung gian)
db.user.belongsToMany(db.project, { through: db.projectRole, foreignKey: "userId", otherKey: "projectId", as: "memberProjects" });
db.project.belongsToMany(db.user, { through: db.projectRole, foreignKey: "projectId", otherKey: "userId", as: "members" });

// project - file
db.project.hasMany(db.file, { foreignKey: "projectId" });
db.file.belongsTo(db.project, { foreignKey: "projectId" });


// One-to-Many: Company -> User (một công ty có nhiều user/moderator)


// Many-to-Many: Company <-> User thông qua bảng trung gian company_moderators
db.company.belongsToMany(db.user, { through: "companyModerator", foreignKey: "companyId", as: "moderators", otherKey: "userId" });
db.user.belongsToMany(db.company, { through: "companyModerator", foreignKey: "userId", as: "companies", otherKey: "companyId" });






db.ROLES = ["user", "admin", "moderator"];

export default db;