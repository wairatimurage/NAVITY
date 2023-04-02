const postSchema = (sequelize, Sequelize) => {
  const Post = sequelize.define("Post", {
    _id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: { type: Sequelize.STRING, unique: true },
    articleText: { type: Sequelize.STRING },
    mainImage: { type: Sequelize.STRING },
    stars: { type: Sequelize.INTEGER, default: 0 },
    images: { type: Sequelize.ARRAY(Sequelize.STRING) },
    status: { type: Sequelize.STRING, allowNull: false },
    publishedOn: { type: Sequelize.DATE, allowNull: false },
    updatedOn: { type: Sequelize.DATE },
  });
  return Post;
};
module.exports = postSchema;
