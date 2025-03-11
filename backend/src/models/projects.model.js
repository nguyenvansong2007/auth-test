export const ProjectsModel = (sequelize, Sequelize) => {
  const projects = sequelize.define("projects", {
    
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    // created_by: {
    //   created_by: Sequelize.INTEGER,
    // }
  });

  return projects;
};