export const ProjectsModel = (sequelize, Sequelize) => {
  const Project = sequelize.define("projects", {
    projectName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    projectNumber: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    projectType: Sequelize.STRING,
    template: Sequelize.STRING,
    address: Sequelize.STRING,

    timeZone: {
      type: Sequelize.STRING,
      defaultValue: "GMT+07:00",
    },
    projectValue: Sequelize.INTEGER,
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Project;
};
