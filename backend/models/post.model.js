export const PostModel =  (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
      content: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.typeOf(sequelize.DataTypes.object),
      }
    });
  
    return Post;
  };