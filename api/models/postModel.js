const postSchema = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "Post",
    {
  id: { type: Sequelize.STRING, required: true },
  title: { type: Sequelize.STRING, unique: true },
  articleText: { type: Sequelize.STRING },
  mainImage: { type: Sequelize.STRING },
  stars: { type: Sequelize.INTEGER, default: 0 },
  images: { type: Sequelize.ARRAY },
  status: { type: Sequelize.STRING, required: true },
  publishedOn: { type: Sequelize.DATE, required: true },
  updatedOn: { type: Sequelize.DATE },
});
};
module.exports = postSchema;
