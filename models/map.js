const Sequelize = require('sequelize');

module.exports = class Map extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      address : {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      lat: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      lng: {
        type: Sequelize.STRING(100),
        allowNull:false
      }
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
    db.Map.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};
