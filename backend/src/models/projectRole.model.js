export const ProjectRoleModel = (sequelize, Sequelize) => {
  const projectRole = sequelize.define("project_roles", {
    projectId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    role: {
      type: Sequelize.ENUM('administrator', 'member'),
      allowNull: false,
    },
  });

  return projectRole;
};
