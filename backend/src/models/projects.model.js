export const ProjectsModel = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: Sequelize.STRING,
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    }
  });
  return Project;
};
