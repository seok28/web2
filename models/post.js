const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      body : {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      createdAt: {
        type : Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};
