export const FileModel = (sequelize, Sequelize) => {
  const file = sequelize.define("files", {
    type: {type: Sequelize.STRING}, 
    name: {type: Sequelize.STRING},
    data: {type: Sequelize.BLOB('long')},
  });
  return file;
};